INSERT INTO products (product_name,category_id,max_order,waiting_list,unit_quantity, category_description, category_name)
    VALUES 
('Chicken',2,2,0,'300 grams','Dairy products that require refrigeration', 'Dairy'),
('Beef',2,2,2,'300 grams','Dairy products that require refrigeration', 'Dairy'),
('Broccoli (frozen)',4,1,0,'200 grams','Dairy products that require refrigeration', 'Dairy'),
('Broccoli (fresh)',3,1,0,'200 grams','Dairy products that require refrigeration', 'Dairy'),
('Tomatoes',3,2,1,'200 grams','Dairy products that require refrigeration', 'Dairy'),
('Toothpaste',5,1,10,'Tube','Dairy products that require refrigeration', 'Dairy'),
('Sanitary pads',5,15,0,'Pad','Dairy products that require refrigeration', 'Dairy'),
('Notebook',7,2,10,'Notebook','Dairy products that require refrigeration', 'Dairy'),
('Batteries AAA',6,4,0,'Battery','Dairy products that require refrigeration', 'Dairy'),
('Batteries AA',6,4,0,'Battery','Dairy products that require refrigeration', 'Dairy'),
('Bleach',5,1,0,'Bottle','Dairy products that require refrigeration', 'Dairy'),
('Pencils',7,2,0,'Pencil','Dairy products that require refrigeration', 'Dairy'),
('Pens',7,2,1,'Pen','Dairy products that require refrigeration', 'Dairy'),
('Pasta',8,2,0,'1 kg','Dairy products that require refrigeration', 'Dairy'),
('Rice',8,2,0,'1 kg','Dairy products that require refrigeration', 'Dairy'),
('Lentil Can',8,3,12,'Unit','Dairy products that require refrigeration', 'Dairy'),
('Lentil Bag',8,1,0,'1 kg','Dairy products that require refrigeration', 'Dairy'),
('Milk (refrigerated)',1,1,1,'Litre','Dairy products that require refrigeration', 'Dairy'),
('Milk (long-life)',9,5,15,'Litre','Dairy products that require refrigeration', 'Dairy'),
('Yogurts',1,5,2,'Unit','Dairy products that require refrigeration', 'Dairy'),
('Cheese',1,2,0,'100 grams','Dairy products that require refrigeration', 'Dairy'),
('Toilet Paper',5,5,1,'Roll','Dairy products that require refrigeration', 'Dairy');

INSERT INTO user_account(username, identity_verified, is_admin, family_unit, postcode, email, password)
VALUES

('admin1234',TRUE,TRUE,0,'n/a','admin1234@council.com','$2y$10$EhCUiDgxhVOoEAUpk2mWxevs/lASdYB4t1/DZeMYStzQ/Xa6xFpPK'),
('pablo1234',TRUE,FALSE,5,'AA1 8TY','pablo@gmail.com','$2y$10$amq7yMtpb1RSo1C3jZA5NOTgOFIAuC9.u91jNUYt.rhvmhzQP6nXy'),
('justin4321',FALSE,FALSE,4,'B4 9JK','justin@gmail.com','$2y$10$q7ADNBfZUWsTFjjVMWqPS.7cxd0IMoPIrQoyUpilE4RC0zE00CoDm'),
('david4321',FALSE,FALSE,2,'NW1 6PO','David@hotmail.com','$2y$10$Nok0yLKoEaKjGDq.1jp37.lwPAZ7V9E8iK7n2eFDTvcBaSHHJ3K1W'),
('abi1234',FALSE,FALSE,1,'P23 5YU','abi@gmail.com','$2y$10$.7OwKG9EJzLHrl/2zGYhiOdZj8C2De9x5VireONvJvxuo1/9iY9hC'),
('resident2',FALSE,FALSE,8,'L1 RT9','fake_email@hotmail.com','$2y$10$G3mGP1rDshpMCEeLIOpRf.FFfkI2n.r9PsECa2QG7iMKneKRGMoGW')