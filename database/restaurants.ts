import { pgTable, serial, text, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const restaurantsTable = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  cuisine: text("cuisine"),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("0.00"),
  isOpen: boolean("is_open").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRestaurantSchema = createInsertSchema(restaurantsTable).omit({ id: true, createdAt: true });
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type Restaurant = typeof restaurantsTable.$inferSelect;
