require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/categories', async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({ data: { name } });
  res.status(201).json(category);
});

app.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

app.post('/transactions', async (req, res) => {
  const { title, amount, transaction_type, category_id, transaction_date } = req.body;
  const transaction = await prisma.transaction.create({
    data: { title, amount, transaction_type, category_id, transaction_date: new Date(transaction_date) },
  });
  res.status(201).json(transaction);
});

app.get('/transactions', async (req, res) => {
  const { start, end } = req.query;
  const where = {};
  if (start || end) {
    where.transaction_date = {};
    if (start) where.transaction_date.gte = new Date(start);
    if (end) where.transaction_date.lte = new Date(end);
  }
  const transactions = await prisma.transaction.findMany({ where });
  res.json(transactions);
});

app.get('/reports/monthly', async (req, res) => {
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
  const txs = await prisma.transaction.findMany({
    where: { transaction_date: { gte: start, lte: end } },
  });
  const income = txs.filter(t => t.transaction_type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = txs.filter(t => t.transaction_type === 'expense').reduce((s, t) => s + t.amount, 0);
  res.json({ year, month, income, expense, balance: income - expense });
});

app.get('/reports/period', async (req, res) => {
  const { start, end } = req.query;
  const txs = await prisma.transaction.findMany({
    where: { transaction_date: { gte: new Date(start), lte: new Date(end) } },
  });
  const income = txs.filter(t => t.transaction_type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = txs.filter(t => t.transaction_type === 'expense').reduce((s, t) => s + t.amount, 0);
  res.json({ start, end, income, expense, balance: income - expense, count: txs.length });
});

app.listen(PORT, () => console.log(`Finance Tracker API running on http://localhost:${PORT}`));
