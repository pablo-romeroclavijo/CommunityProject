DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS items_donated CASCADE;
DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS requests CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS items_requested CASCADE;

CREATE TABLE items_donated(
    item_id INTEGER GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    donation_id INTEGER NOT NULL,
    expiration_date DATE NOT NULL,
    quantity_donated INTEGER NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT '0',
    quantity_remaining INTEGER NOT NULL,
    to_dispose BOOLEAN NOT NULL DEFAULT '0',
    product_id INTEGER NOT NULL
);
ALTER TABLE
    items_donated ADD PRIMARY KEY(item_id);


CREATE TABLE items_requested(
    item_id INTEGER GENERATED ALWAYS AS IDENTITY,
    request_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    fulfilled BOOLEAN NOT NULL DEFAULT '0',
    expiration_date DATE NULL,
    product_id INTEGER NOT NULL,
<<<<<<< HEAD
    collected BOOLEAN NOT NULL DEFAULT '0',
    quantity_requested INTEGER NOT NULL
=======
    collected BOOLEAN NOT NULL DEFAULT '0'
>>>>>>> e7bf8e8f20dbd6a74c95d1fe51d41d05f60eafd2
);
ALTER TABLE
    items_requested ADD PRIMARY KEY(item_id);


CREATE TABLE requests(
    request_id INTEGER GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Open',
    request_date DATE NOT NULL
);
ALTER TABLE
    requests ADD PRIMARY KEY(request_id);


CREATE TABLE donations(
    donation_id INTEGER GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    received BOOLEAN NOT NULL DEFAULT '0',
    donation_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Open',
    drop_id INTEGER NULL
);
ALTER TABLE
    donations ADD PRIMARY KEY(donation_id);


CREATE TABLE token(
    token_id INTEGER GENERATED ALWAYS AS IDENTITY,
    token CHAR(60) NULL,
    user_id INTEGER NOT NULL
);
ALTER TABLE
    token ADD PRIMARY KEY(token_id);


CREATE TABLE products(
    product_id INTEGER GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(20) NOT NULL UNIQUE,
    category_id INTEGER NOT NULL,
    max_order INTEGER NOT NULL DEFAULT '1',
    waiting_list INTEGER NOT NULL,
    unit_quantity VARCHAR(20) NOT NULL,
    category_description VARCHAR(255) NOT NULL,
    category_name VARCHAR(60) NOT NULL
);
ALTER TABLE
    products ADD PRIMARY KEY(product_id);


CREATE TABLE events(
    event_id INTEGER GENERATED ALWAYS AS IDENTITY,
    code CHAR(6) NOT NULL UNIQUE,
    type CHAR(1) NOT NULL,
    QR_code_URL VARCHAR(255) NULL,
<<<<<<< HEAD
    slot_date DATE,
    slot_time TIME(0) WITHOUT TIME ZONE 
=======
    slot_date DATE NOT NULL,
    slot_time TIME(0) WITHOUT TIME ZONE NOT NULL
>>>>>>> e7bf8e8f20dbd6a74c95d1fe51d41d05f60eafd2
);
ALTER TABLE
    events ADD PRIMARY KEY(event_id);


CREATE TABLE user_account(
    user_id INTEGER GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(25) NOT NULL UNIQUE,
    identity_verified BOOLEAN NOT NULL DEFAULT '0',
    is_admin BOOLEAN NOT NULL DEFAULT '0',
    family_unit INTEGER NOT NULL DEFAULT '1',
    postcode VARCHAR(9) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password CHAR(60) NOT NULL
);
ALTER TABLE
    "user_account" ADD PRIMARY KEY("user_id");
ALTER TABLE
    "items_requested" ADD CONSTRAINT "a" FOREIGN KEY("request_id") REFERENCES "requests"("request_id");
ALTER TABLE
    "donations" ADD CONSTRAINT "b" FOREIGN KEY("drop_id") REFERENCES "events"("event_id");
ALTER TABLE
    "items_requested" ADD CONSTRAINT "c" FOREIGN KEY("event_id") REFERENCES "events"("event_id");
ALTER TABLE
    "items_donated" ADD CONSTRAINT "d" FOREIGN KEY("donation_id") REFERENCES "donations"("donation_id");
ALTER TABLE
    "items_requested" ADD CONSTRAINT "e" FOREIGN KEY("product_id") REFERENCES "products"("product_id");
ALTER TABLE
    "donations" ADD CONSTRAINT "f" FOREIGN KEY("user_id") REFERENCES "user_account"("user_id");
ALTER TABLE
    "items_donated" ADD CONSTRAINT "g" FOREIGN KEY("product_id") REFERENCES products("product_id");
ALTER TABLE
    "requests" ADD CONSTRAINT "h" FOREIGN KEY("user_id") REFERENCES "user_account"("user_id");
ALTER TABLE
    "token" ADD CONSTRAINT "i" FOREIGN KEY("user_id") REFERENCES "user_account"("user_id");
ALTER TABLE
    "items_donated" ADD CONSTRAINT "j" FOREIGN KEY("user_id") REFERENCES "user_account"("user_id");