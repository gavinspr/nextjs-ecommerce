"use server";

import { db } from "@nextjs-ecommerce/db";
import { sql } from "drizzle-orm";

export async function isValueUnique(
  tableName: string,
  columnName: string,
  value: string,
  excludeId?: string,
  idColumn: string = "id"
): Promise<boolean> {
  const condition = sql`${sql.identifier(columnName)} = ${value}`;

  const whereClause = excludeId
    ? sql`${condition} AND ${sql.identifier(idColumn)} != ${excludeId}`
    : condition;

  const query = sql`
    SELECT EXISTS(
      SELECT 1 
      FROM ${sql.identifier(tableName)}
      WHERE ${whereClause}
    ) AS "exists"
  `;

  const result = await db.execute<{ exists: boolean }>(query);
  return !result[0].exists;
}
