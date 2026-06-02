require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'change-me';
const PORT = process.env.PORT || 3004;

function buildSignature(rawPayload) {
  return crypto.createHmac('sha256', WEBHOOK_SECRET).update(rawPayload).digest('hex');
}

const KNOWN_EVENT_TYPES = new Set(['user.created', 'payment.completed', 'order.updated']);

app.post('/webhooks/:source', async (req, res) => {
  const { source } = req.params;
  const providedSignature = req.headers['x-signature'] || '';
  const rawPayload = JSON.stringify(req.body);
  const expectedSignature = buildSignature(rawPayload);

  let signatureValid = false;
  if (expectedSignature.length === providedSignature.length) {
    signatureValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(providedSignature)
    );
  }

  if (!signatureValid) {
    return res.status(401).json({ detail: 'Invalid signature' });
  }

  const status = KNOWN_EVENT_TYPES.has(req.body.event_type) ? 'processed' : 'queued';

  const event = await prisma.webhookEvent.create({
    data: {
      source,
      event_type: req.body.event_type,
      payload: JSON.stringify(req.body.data),
      signature_valid: true,
      status,
    },
  });

  res.status(202).json({ id: event.id, status: event.status });
});

app.get('/events', async (req, res) => {
  const events = await prisma.webhookEvent.findMany();
  res.json(events);
});

app.listen(PORT, () => console.log(`Webhook Receiver API running on http://localhost:${PORT}`));
