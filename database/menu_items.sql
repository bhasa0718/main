insert into menu_items
(restaurantId, name, price, category, imageUrl, isAvailable)
VALUES
(1, 'Margherita Pizza', 12.99, 'Pizza',
 'https://example.com/pizza1.jpg', TRUE),

(1, 'Pepperoni Pizza', 14.99, 'Pizza',
 'https://example.com/pizza2.jpg', TRUE),

(2, 'Butter Chicken', 15.50, 'Main Course',
 'https://example.com/butterchicken.jpg', TRUE),

(2, 'Paneer Tikka', 11.25, 'Starter',
 'https://example.com/paneer.jpg', TRUE),

(3, 'Classic Burger', 8.99, 'Burger',
 'https://example.com/burger1.jpg', TRUE),

(3, 'Cheese Burger', 10.49, 'Burger',
 'https://example.com/burger2.jpg', FALSE);

 select*from menu_items;