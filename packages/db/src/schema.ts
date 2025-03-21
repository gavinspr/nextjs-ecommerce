import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  boolean
} from "drizzle-orm/pg-core";

// Users table
// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });

// export const posts = pgTable("posts", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   content: text("content").notNull(),
//   authorId: integer("author_id")
//     .references(() => users.id)
//     .notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });

// export const todo = pgTable("todo", {
//   id: integer("id").primaryKey(),
//   text: text("text").notNull(),
//   done: boolean("done").default(false).notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });