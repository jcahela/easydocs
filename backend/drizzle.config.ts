import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // @ts-ignore - Config file outside rootDir
    url: process.env.DATABASE_URL!,
  },
});
