ALTER TABLE "ratings" RENAME TO "product_ratings";--> statement-breakpoint
ALTER TABLE "product_ratings" DROP CONSTRAINT "ratings_product_id_product_variant_id_user_id_unique";--> statement-breakpoint
ALTER TABLE "product_ratings" DROP CONSTRAINT "rating_check";--> statement-breakpoint
ALTER TABLE "product_ratings" DROP CONSTRAINT "ratings_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "product_ratings" DROP CONSTRAINT "ratings_product_variant_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "product_ratings" DROP CONSTRAINT "ratings_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "product_ratings" ADD CONSTRAINT "product_ratings_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_ratings" ADD CONSTRAINT "product_ratings_product_variant_id_products_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_ratings" ADD CONSTRAINT "product_ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_ratings" ADD CONSTRAINT "product_ratings_product_id_product_variant_id_user_id_unique" UNIQUE("product_id","product_variant_id","user_id");--> statement-breakpoint
ALTER TABLE "product_ratings" ADD CONSTRAINT "rating_check" CHECK ("product_ratings"."rating" >= 1 AND "product_ratings"."rating" <= 5);