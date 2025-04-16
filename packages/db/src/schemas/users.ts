import {
  index,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns";
import { relations } from "drizzle-orm";
import {
  productRatingsTable,
  selectProductRatingsSchema,
} from "./product-ratings";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const userRoleEnum = pgEnum("user_role", ["user", "admin", "moderator"]);

export const providerEnum = pgEnum("provider_enum", [
  "google",
  "github",
  "facebook",
]);

export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: timestamp("email_verified", { withTimezone: true }),
    password: varchar("password", { length: 255 }).notNull(), // Hashed password
    role: userRoleEnum("role").notNull().default("user"),
    avatarUrl: varchar("avatar_url", { length: 512 }),
    ...timestamps,
    provider: providerEnum(),
    providerId: varchar("provider_id", { length: 255 }),
    lastLogin: timestamp("last_login", { withTimezone: true }),
    resetPasswordToken: varchar("reset_password_token", { length: 255 }),
    resetPasswordExpires: timestamp("reset_password_expires", {
      withTimezone: true,
    }),
  },
  (t) => [index("name_idx").on(t.name)]
);

export const selectUserSchema = createSelectSchema(usersTable);

export const userRoleSchema = z.enum(userRoleEnum.enumValues);
export const providerSchema = z.enum(providerEnum.enumValues);

export const insertUserSchema = createInsertSchema(usersTable, {
  email: z.string().email().max(255),
  password: z
    .string()
    .min(8)
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, and one number"
    ),
  name: z.string().max(255),
  role: userRoleSchema.default("user"),
  avatarUrl: z.string().url().max(512).optional(),
  provider: providerSchema.optional(),
  providerId: z.string().max(255).optional(),
}).omit({
  id: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
  resetPasswordToken: true,
  resetPasswordExpires: true,
});

export const updateUserSchema = insertUserSchema.partial().extend({
  id: z.string().uuid(),
});

export const userFormSchema = insertUserSchema.omit({ role: true });

export const usersRelations = relations(usersTable, ({ many }) => ({
  ratings: many(productRatingsTable),
}));

export const userWithRelationsSchema = selectUserSchema.extend({
  ratings: z.lazy(() => z.array(selectProductRatingsSchema).optional()),
});
