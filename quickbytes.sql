CREATE TABLE userees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE restaurantees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  cuisine TEXT,
  rating NUMERIC(3,2),
  is_open BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE menu_itemses (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orderees (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  restaurant_id INTEGER REFERENCES restaurants(id),
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount NUMERIC(10,2) NOT NULL,
  delivery_address TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_itemees (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  menu_item_id INTEGER REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

INSERT INTO userees (name, email, phone, address) VALUES
('John Smith', 'johnees@gmail.com', '9876543210', '123 Main Street, New York'),
('Emma Johnson', 'emmulees@gmail.com', '9876543211', '456 Oak Avenue, Chicago'),
('Michael Brown', 'michaelees@gmail.com', '9876543212', '789 Pine Road, Dallas');

INSERT INTO restaurantees (name, address, cuisine, rating, is_open) VALUES
('Pizza Palace', '123 Food Street, New York', 'Italian', 4.5, true),
('Burger Barn', '456 Eat Avenue, Chicago', 'American', 4.2, true),
('Spice Garden', '789 Curry Road, Dallas', 'Indian', 4.8, true);

INSERT INTO menu_itemses (restaurant_id, name, price) VALUES
(1, 'Margherita Pizza', 12.99),
(1, 'Pepperoni Pizza', 14.99),
(2, 'Classic Burger', 9.99),
(2, 'Cheese Burger', 11.99),
(3, 'Butter Chicken', 13.99),
(3, 'Biryani', 12.99);

INSERT INTO orderees (user_id, restaurant_id, status, total_amount, delivery_address) VALUES
(1, 1, 'pending', 27.98, '123 Main Street, New York'),
(2, 2, 'confirmed', 21.98, '456 Oak Avenue, Chicago');

INSERT INTO order_itemees (order_id, menu_item_id, quantity, price) VALUES
(1, 1, 1, 12.99),
(1, 2, 1, 14.99),
(2, 3, 2, 9.99);

SELECT * FROM userees;
SELECT * FROM restaurantees;
SELECT * FROM menu_itemses;
SELECT * FROM orderees;
SELECT * FROM order_itemees;