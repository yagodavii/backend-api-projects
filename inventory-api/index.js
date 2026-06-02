require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.post('/categories', async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({ data: { name } });
  res.status(201).json(category);
});

app.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

app.post('/products', async (req, res) => {
  const { name, category_id, quantity = 0 } = req.body;
  const category = await prisma.category.findUnique({ where: { id: category_id } });
  if (!category) {
    return res.status(404).json({ detail: 'Category not found' });
  }
  const product = await prisma.product.create({ data: { name, quantity, category_id } });
  res.status(201).json(product);
});

app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post('/products/:id/stock-in', async (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(400).json({ detail: 'Quantity must be positive' });
  }
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return res.status(404).json({ detail: 'Product not found' });
  }
  const [updated] = await prisma.$transaction([
    prisma.product.update({ where: { id }, data: { quantity: { increment: quantity } } }),
    prisma.movement.create({ data: { product_id: id, movement_type: 'in', quantity } }),
  ]);
  res.json(updated);
});

app.post('/products/:id/stock-out', async (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(400).json({ detail: 'Quantity must be positive' });
  }
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return res.status(404).json({ detail: 'Product not found' });
  }
  if (product.quantity < quantity) {
    return res.status(400).json({ detail: 'Insufficient stock' });
  }
  const [updated] = await prisma.$transaction([
    prisma.product.update({ where: { id }, data: { quantity: { decrement: quantity } } }),
    prisma.movement.create({ data: { product_id: id, movement_type: 'out', quantity } }),
  ]);
  res.json(updated);
});

app.get('/movements', async (req, res) => {
  const movements = await prisma.movement.findMany();
  res.json(movements);
});

app.listen(PORT, () => console.log(`Inventory API running on http://localhost:${PORT}`));
