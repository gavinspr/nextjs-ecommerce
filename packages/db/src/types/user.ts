import { z } from "zod";
import {
  insertUserSchema,
  providerSchema,
  selectUserSchema,
  updateUserSchema,
  userFormSchema,
  userRoleSchema,
  userWithRelationsSchema,
} from "../schemas";

export type User = z.infer<typeof selectUserSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type Provider = z.infer<typeof providerSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export type UserFormValues = z.infer<typeof userFormSchema>;

export type UserWithRelations = z.infer<typeof userWithRelationsSchema>;
