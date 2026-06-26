insert into orders
(userId, restaurantId, status, totalAmount, deliveryAddress)
values
(1, 1, 'Delivered', 27.98,
 '123 Main Street, New York'),

(2, 2, 'Preparing', 26.75,
 '456 Oak Avenue, Chicago'),

(3, 3, 'Pending', 8.99,
 '789 Pine Road, Dallas');

 select*from orders;