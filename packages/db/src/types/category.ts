import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { categoriesTable } from "../schemas";

export const categorySelectSchema = createSelectSchema(categoriesTable);

export type Category = z.infer<typeof categorySelectSchema>;
