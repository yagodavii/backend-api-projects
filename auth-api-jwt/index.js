require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const PORT = process.env.PORT || 3000;

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ detail: 'Could not validate credentials' });
  }
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = parseInt(payload.sub);
    next();
  } catch {
    res.status(401).json({ detail: 'Could not validate credentials' });
  }
}

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ detail: 'Email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ detail: 'Password must have at least 6 characters' });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ detail: 'Email already registered' });
  }
  const password_hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password_hash } });
  res.status(201).json({ id: user.id, email: user.email });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ detail: 'Invalid email or password' });
  }
  const token = jwt.sign({ sub: String(user.id) }, JWT_SECRET, { expiresIn: '60m' });
  res.json({ access_token: token, token_type: 'bearer' });
});

app.get('/me', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) {
    return res.status(401).json({ detail: 'Could not validate credentials' });
  }
  res.json({ id: user.id, email: user.email });
});

app.listen(PORT, () => console.log(`Auth API running on http://localhost:${PORT}`));
