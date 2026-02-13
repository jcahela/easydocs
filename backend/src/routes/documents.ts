import { Hono } from 'hono';
import { db } from '../db';
import { documents, type NewDocument } from '../db/schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

// GET /api/documents - Get all documents
app.get('/', async (c) => {
  const allDocuments = await db.select().from(documents);
  return c.json(allDocuments);
});

// GET /api/documents/:id - Get single document
app.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const document = await db.select().from(documents).where(eq(documents.id, id));
  
  if (document.length === 0) {
    return c.json({ error: 'Document not found' }, 404);
  }
  
  return c.json(document[0]);
});

// POST /api/documents - Create document
app.post('/', async (c) => {
  const body = await c.req.json<NewDocument>();
  const newDocument = await db.insert(documents).values(body).returning();
  return c.json(newDocument[0], 201);
});

// PUT /api/documents/:id - Update document
app.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json<Partial<NewDocument>>();
  
  const updatedDocument = await db
    .update(documents)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(documents.id, id))
    .returning();
  
  if (updatedDocument.length === 0) {
    return c.json({ error: 'Document not found' }, 404);
  }
  
  return c.json(updatedDocument[0]);
});

// DELETE /api/documents/:id - Delete document
app.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const deletedDocument = await db.delete(documents).where(eq(documents.id, id)).returning();
  
  if (deletedDocument.length === 0) {
    return c.json({ error: 'Document not found' }, 404);
  }
  
  return c.json({ message: 'Document deleted' });
});

export default app;
