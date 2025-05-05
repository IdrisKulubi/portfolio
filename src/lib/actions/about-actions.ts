"use server";

import db from '@/db/drizzle';
import { about } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export interface AboutData {
  bio: string;
  skills: string[];
  experience?: Array<{ company: string; role: string; start: string; end?: string; description?: string }>;
  hero?: { headline: string; subheadline?: string; image?: string };
}

// Get about info (assume single row)
export async function getAbout() {
  const result = await db.select().from(about);
  return result[0];
}

// Create about info
export async function createAbout(data: AboutData) {
  const id = uuidv4();
  const createdAt = new Date();
  const [row] = await db.insert(about).values({ ...data, id, createdAt }).returning();
  return row;
}

// Update about info (by id)
export async function updateAbout(id: string, data: Partial<AboutData>) {
  const [row] = await db.update(about).set({ ...data }).where(eq(about.id, id)).returning();
  return row;
}

// Delete about info (by id)
export async function deleteAbout(id: string) {
  await db.delete(about).where(eq(about.id, id));
} 