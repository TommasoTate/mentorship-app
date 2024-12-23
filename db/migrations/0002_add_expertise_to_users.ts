import { sql } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

export async function up(db) {
  await db.schema.alterTable('users', (table) => {
    table.addColumn('expertise', text('expertise'));
  });
}

export async function down(db) {
  await db.schema.alterTable('users', (table) => {
    table.dropColumn('expertise');
  });
}

