const fs = require('fs');
require("dotenv").config();
const { parse } = require("csv-parse")


let users = []
let categories = []
let products = []
  
//Read users
function loadUsers(){
    const query = 'INSERT INTO users (user_id, username, identity_verified, admin, family_unit, Postcode, Email, Password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'

    fs.createReadStream("./resources/users.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        db.query(query, row);
        users.push(row)})
    .on("end", function () {
        // Here log the result array
        console.log("parsed csv data:");
        console.log(users)})
}

//Read catogroies and import to DB
function loadCategories(){
    const query = 'INSERT INTO categories (category_id, category_name, description) VALUES ($1, $2, $3)'

    fs.createReadStream("./resources/categories.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        db.query(query, row);
        users.push(row)})
    .on("end", function () {
        console.log("parsed categories data:");
        console.log(categories)})
}


//Read products and import to DB
function loadProducts(){
    const query = 'INSERT INTO users (user_id, username, identity_verified, admin, family_unit, Postcode, Email, Password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'

    fs.createReadStream("./resources/products.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {//console.log(row);
        users.push(row)})
    .on("end", function () {
        // Here log the result array
        console.log("parsed product data:");
        console.log(products)})
}

module.expors = { loadCategories, loadProducts, loadUsers }