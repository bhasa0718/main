import { db } from "./db";
import * as schema from "./schema";

async function seed() {
  // Add a user
  await db.insert(schema.usersTable).values({
    name: "John",
    email: "john@example.com",
  });

  // Add a restaurant
  await db.insert(schema.restaurantsTable).values({
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: "4.5",
    is_open: true,
  });

  console.log("✅ Seeding done!");
  process.exit(0);
}

seed();