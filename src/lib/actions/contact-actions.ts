"use server";

import db from '@/db/drizzle';
import { contact } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export interface ContactData {
  email: string;
  phone?: string;
  socials?: Array<{ type: string; url: string }>;
  address?: string;
}

// Get contact info (assume single row)
export async function getContact() {
  const result = await db.select().from(contact);
  return result[0];
}

// Create contact info
export async function createContact(data: ContactData) {
  const id = uuidv4();
  const createdAt = new Date();
  const [row] = await db.insert(contact).values({ ...data, id, createdAt }).returning();
  return row;
}

// Update contact info (by id)
export async function updateContact(id: string, data: Partial<ContactData>) {
  const [row] = await db.update(contact).set({ ...data }).where(eq(contact.id, id)).returning();
  return row;
}

// Delete contact info (by id)
export async function deleteContact(id: string) {
  await db.delete(contact).where(eq(contact.id, id));
} 