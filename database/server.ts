import express from "express";
import { db } from "./db.js";
import * as schema from "./schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

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
// POST - Create user
app.post("/users", async (req, res) => {
  try {
    const newUser = await db.insert(schema.usersTable)
      .values(req.body)
      .returning();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// POST - Create restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const newRestaurant = await db.insert(schema.restaurantsTable)
      .values(req.body)
      .returning();
    res.json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Failed to create restaurant" });
  }
});

// POST - Create menu item
app.post("/menu-items", async (req, res) => {
  try {
    const newMenuItem = await db.insert(schema.menuItemsTable)
      .values(req.body)
      .returning();
    res.json(newMenuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create menu item" });
  }
});

// POST - Create order
app.post("/orders", async (req, res) => {
  try {
    const newOrder = await db.insert(schema.ordersTable)
      .values(req.body)
      .returning();
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// POST - Create order item
app.post("/order-items", async (req, res) => {
  try {
    const newOrderItem = await db.insert(schema.orderItemsTable)
      .values(req.body)
      .returning();
    res.json(newOrderItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order item" });
  }
});
// Register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.insert(schema.usersTable)
      .values({ name, email, password: hashedPassword })
      .returning();
    res.json({ message: "Registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await db.select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, email));

    if (users.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      "your_secret_key",
      { expiresIn: "24h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});