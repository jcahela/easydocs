import { describe, it, expect, beforeEach } from 'vitest';
import { Hono } from 'hono';
import documentsRoutes from './documents';
import { db } from '../db';
import { documents, type Document } from '../db/schema';

const app = new Hono();
app.route('/api/documents', documentsRoutes);

describe('Documents API', () => {
  // Clean up database before each test
  beforeEach(async () => {
    await db.delete(documents);
  });

  describe('GET /api/documents', () => {
    it('should return empty array when no documents exist', async () => {
      const res = await app.request('/api/documents');
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toEqual([]);
    });

    it('should return all documents', async () => {
      // Create test documents
      await db.insert(documents).values([
        { title: 'Doc 1', content: 'Content 1' },
        { title: 'Doc 2', content: 'Content 2' },
      ]);

      const res = await app.request('/api/documents');
      expect(res.status).toBe(200);
      const data = await res.json() as Document[];
      expect(data).toHaveLength(2);
      expect(data[0]!.title).toBe('Doc 1');
      expect(data[0]!.content).toBe('Content 1');
      expect(data[1]!.title).toBe('Doc 2');
      expect(data[1]!.content).toBe('Content 2');
    });
  });
});
