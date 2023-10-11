INSERT INTO products (product_name,category_id,max_order,waiting_list,unit_quantity, category_description, category_name, sub_category_name)
    VALUES 
('Chicken',2,2,0,'300 grams','Requires refrigeration.', 'Fresh Food', 'Meat & Poultry'),
('Beef',2,2,2,'300 grams','Requires refrigeration.', 'Fresh Food', 'Meat & Poultry'),
('Bacon',2,2,2,'300 grams','Requires refrigeration.', 'Fresh Food', 'Meat & Poultry'),
('Eggs',2,2,2,'300 grams','Requires refrigeration.', 'Fresh Food', 'Meat & Poultry'),
('Milk (refrigerated)',1,1,1,'2 L','Requires refrigeration.', 'Dairy', 'Milk'),
('Soya Milk (unsweetened)',9,5,15,'1 L','Requires refrigeration.', 'Dairy', 'Milk'),
('Milk (long-life)',9,5,15,'1 L','Store in a cool dry place. Once opened, keep refrigerated and treat as fresh milk. Not suitable for freezing. Consume within 3 days of opening and by date shown.', 'Dairy', 'Milk'),
('Greek Yogurt',1,5,2,'450 grams','Requires refrigeration.', 'Dairy', 'Yoghurts'),
('Cheddar Cheese',1,2,0,'100 grams','Requires refrigeration.', 'Dairy', 'Cheese'),
('Broccoli',4,1,0,'200 grams','Requires refrigeration.', 'Fresh Food', 'Vegetables'),
('Broccoli',3,1,0,'200 grams','Keep frozen at -18C or cooler. Important: If food has thawed, do not refreeze.', 'Frozen Food', 'Vegetables'),
('Tomatoes',3,2,1,'200 grams','Fresh Fruit & Veg', 'Fresh Food','Vegetables'),
('Bananas',3,2,1,'200 grams','Fresh Fruit & Veg', 'Fresh Food','Fruits'),
('Egg Noodles',8,2,0,'340 grams','Fine egg noodles. Store in a cool dry place.', 'Dried Pasta, Noodles, Rice & Grains', 'Noodles'),
('Basmati Rice',8,2,0,'1 kg','Store in a cool dry place.', 'Dried Pasta, Noodles, Rice & Grains', 'Rice'),
('Cous cous (whole wheat)',8,3,12,'500 grams','Store in a cool dry place. 14 servings.', 'Dried Pasta, Noodles, Rice & Grains', 'Other'),
('Lentil Bag',8,1,0,'1 kg','Dried red split lentils. Gluten-free. Store in a cool dry place.', 'Dried Pasta, Noodles, Rice & Grains', 'Other'),
('Toothpaste',5,1,10,'125 ml','Not for use of children under 7 years old. Contains: Glycerin, Aqua, Hydrated Silica, Sodium Methyl Cocoyl Taurate, Arginine, Aroma, Zinc Oxide, Cocamidopropyl Betaine, Calcium Pyrophosphate, Benzyl Alcohol, Xanthan Gum, Cellulose Gum, Zinc Citrate, Tetrasodium Pyrophosphate, Sodium Saccharin, Sodium Fluoride, Phosphoric Acid, Eugenol, CI 74260, CI 77492. Contains: Sodium Fluoride Total Fluoride content: 1450 ppm', 'Hygiene', 'Dental'),
('Toothbrush',5,1,10,'3 pack','N/A', 'Hygiene', 'Dental'),
('Sanitary towels',5,15,0,'16 pack','Do not flush pad down the toilet. Keep in a cool place.', 'Hygiene','Women Toiletries'),
('A4 Notebook',7,2,10,'192 pages','Lined pages.', 'Stationery', 'Notbooks & notepads'),
('Batteries AAA',6,4,0,'4 pack','Last up to 10 years in their packaging.', 'Household', 'Batteries'),
('Batteries AA',6,4,0,'4 pack','Up to 12 year shelf life.', 'Household', 'Batteries'),
('Bleach',5,1,0,'750 ml','Please refer to the safety instructions on the label when handelling.', 'Household', 'Cleaning'),
('Pencils',7,2,0,'10 pack','Writing essentials. HB.', 'Stationery', 'Pens & Pencils'),
('Pens',7,2,1,'3 pack','Writing essentials.', 'Stationery', 'Pens & Pencils'),
('Toilet Paper',5,5,1,'8 pack','Every roll is 3ply with approximately 160 sheets and 17.6m long.', 'Household', 'Essentials');

INSERT INTO user_account(username, identity_verified, is_admin, family_unit, postcode, email, password)
VALUES

('admin1234',TRUE,TRUE,0,'n/a','admin1234@council.com','$2y$10$EhCUiDgxhVOoEAUpk2mWxevs/lASdYB4t1/DZeMYStzQ/Xa6xFpPK'),
('pablo1234',TRUE,FALSE,5,'AA1 8TY','pablo@gmail.com','$2y$10$amq7yMtpb1RSo1C3jZA5NOTgOFIAuC9.u91jNUYt.rhvmhzQP6nXy'),
('justin4321',FALSE,FALSE,4,'B4 9JK','justin@gmail.com','$2y$10$q7ADNBfZUWsTFjjVMWqPS.7cxd0IMoPIrQoyUpilE4RC0zE00CoDm'),
('david4321',FALSE,FALSE,2,'NW1 6PO','David@hotmail.com','$2y$10$Nok0yLKoEaKjGDq.1jp37.lwPAZ7V9E8iK7n2eFDTvcBaSHHJ3K1W'),
('abi1234',FALSE,FALSE,1,'P23 5YU','abi@gmail.com','$2y$10$.7OwKG9EJzLHrl/2zGYhiOdZj8C2De9x5VireONvJvxuo1/9iY9hC'),
('resident2',FALSE,FALSE,8,'L1 RT9','fake_email@hotmail.com','$2y$10$G3mGP1rDshpMCEeLIOpRf.FFfkI2n.r9PsECa2QG7iMKneKRGMoGW')