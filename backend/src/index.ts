import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import 'dotenv/config';
import documentsRoutes from './routes/documents';

const app = new Hono();

// Middleware
app.use('/*', cors());

// Routes
app.route('/api/documents', documentsRoutes);

// Health check
app.get('/', (c) => {
  return c.json({ message: 'Easydocs API' });
});

const port = parseInt(process.env.PORT || '3000');

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
