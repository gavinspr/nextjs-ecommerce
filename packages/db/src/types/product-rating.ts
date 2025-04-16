import { z } from "zod";
import { insertProductRatingSchema, productRatingFormSchema, productRatingsWithRelationsSchema, selectProductRatingsSchema, updateProductRatingSchema } from "../schemas";

export type ProductRating = z.infer<typeof selectProductRatingsSchema>

export type InsertProductRating = z.infer<typeof insertProductRatingSchema>
export type UpdateProductRating = z.infer<typeof updateProductRatingSchema>

export type ProductRatingFormValues = z.infer<typeof productRatingFormSchema>

export type ProductRatingWithRelations = z.infer<typeof productRatingsWithRelationsSchema>
