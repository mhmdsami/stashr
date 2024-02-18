ALTER TABLE "notes" ADD COLUMN "views" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "updated_at" timestamp DEFAULT now();