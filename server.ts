import express from "express";
import { db } from "./db.js";
import * as schema from "./schema.js";

const app = express();

app.use(express.json());

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await db.select().from(schema.usersTable);
    res.json(users);
  } catch (err) {
    console.error("USERS ERROR:");
    console.dir(err, { depth: null });
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await db.select().from(schema.restaurantsTable);
    res.json(restaurants);
  } catch (err) {
    console.error("RESTAURANTS ERROR:");
    console.dir(err, { depth: null });
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Get all menu items
app.get("/menu_items", async (req, res) => {
  try {
    const items = await db.select().from(schema.menuItemsTable);
    res.json(items);
  } catch (err) {
    console.error("MENU ITEMS ERROR:");
    console.dir(err, { depth: null });
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await db.select().from(schema.ordersTable);
    res.json(orders);
  } catch (err) {
    console.error("ORDERS ERROR:");
    console.dir(err, { depth: null });
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get all order items
app.get("/order_items", async (req, res) => {
  try {
    const orderItems = await db.select().from(schema.orderItemsTable);
    res.json(orderItems);
  } catch (err) {
    console.error("ORDER ITEMS ERROR:");
    console.dir(err, { depth: null });
    res.status(500).json({ error: "Failed to fetch order items" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});