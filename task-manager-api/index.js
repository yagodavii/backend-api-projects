require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const PORT = process.env.PORT || 3003;

async function userMiddleware(req, res, next) {
  const userId = parseInt(req.headers['x-user-id']);
  if (isNaN(userId) || userId <= 0) {
    return res.status(401).json({ detail: 'Invalid X-User-Id' });
  }
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(401).json({ detail: 'Invalid X-User-Id' });
  }
  req.userId = userId;
  next();
}

app.post('/users', async (req, res) => {
  const { name } = req.body;
  const user = await prisma.user.create({ data: { name } });
  res.status(201).json({ id: user.id, name: user.name });
});

app.post('/tasks', userMiddleware, async (req, res) => {
  const { title, description = '', status = 'todo', priority = 'medium' } = req.body;
  const task = await prisma.task.create({
    data: { title, description, status, priority, user_id: req.userId },
  });
  res.status(201).json(task);
});

app.get('/tasks', userMiddleware, async (req, res) => {
  const { status, priority } = req.query;
  const where = { user_id: req.userId };
  if (status) where.status = status;
  if (priority) where.priority = priority;
  const tasks = await prisma.task.findMany({ where });
  res.json(tasks);
});

app.patch('/tasks/:id', userMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.user_id !== req.userId) {
    return res.status(404).json({ detail: 'Task not found' });
  }
  const { title, description, status, priority } = req.body;
  const data = {};
  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (status !== undefined) data.status = status;
  if (priority !== undefined) data.priority = priority;
  const updated = await prisma.task.update({ where: { id }, data });
  res.json(updated);
});

app.delete('/tasks/:id', userMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.user_id !== req.userId) {
    return res.status(404).json({ detail: 'Task not found' });
  }
  await prisma.task.delete({ where: { id } });
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Task Manager API running on http://localhost:${PORT}`));
