import { pgTable, text, varchar, integer, boolean, json, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 50 }).notNull(),
  tags: json('tags').$type<string[]>().notNull(),
  thumbnail: json('thumbnail').$type<{ src: string; alt: string; width: number; height: number }>().notNull(),
  images: json('images').$type<Array<{ src: string; alt: string; width: number; height: number }>>().notNull(),
  client: varchar('client', { length: 255 }),
  year: integer('year'),
  description: text('description').notNull(),
  challenge: text('challenge'),
  solution: text('solution'),
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const about = pgTable('about', {
  id: varchar('id', { length: 36 }).primaryKey(),
  bio: text('bio').notNull(),
  skills: json('skills').$type<string[]>().notNull(),
  experience: json('experience').$type<Array<{ company: string; role: string; start: string; end?: string; description?: string }>>(),
  hero: json('hero').$type<{ headline: string; subheadline?: string; image?: string }>(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const contact = pgTable('contact', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  socials: json('socials').$type<Array<{ type: string; url: string }>>(),
  address: text('address'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
