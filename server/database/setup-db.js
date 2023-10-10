const fs = require('fs');
require("dotenv").config();

const { parse } = require("csv-parse")

const db = require("./connect");
const sql = fs.readFileSync('./database/db.sql').toString();
const dataSQL = fs.readFileSync('./database/db-data.sql').toString();


db.query(sql)
    .then(data => {
        console.log("Set-up complete.");
        db.query(dataSQL)
            .then(data => {
            db.end();
            console.log("Data uploaded");
            })
    })
    .catch(error => console.log(error));

// readUsers()
//readProducts()



// //Read users
// async function readUsers(){
//     const query = 'INSERT INTO users (user_id, username, identity_verified, admin, family_unit, Postcode, Email, Password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
//     let users = []
//     await fs.createReadStream("./database/resources/users.csv")
//         .pipe(parse({ delimiter: ",", from_line: 2 }))
//         .on("data", function (row) {
//             users.push(row)})
//         .on("end", function () {
//             console.log("parsed csv data:");
//             users.map(user =>{
//                 console.log(user)
//                 db.query(query, user)

//             })
//         })
   
// }

// // //Read products and import to DB
// // async function readProducts(){
// //     //const query = 'INSERT INTO users (user_id, username, identity_verified, admin, family_unit, Postcode, Email, Password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
// //     let products = []
// //     fs.createReadStream("./database/resources/products.csv")
// //     .pipe(parse({ delimiter: ",", from_line: 2 }))
// //     .on("data", function (row) {
// //         products.push(row)})
// //     .on("end", function () {
// //         // Here log the result array
// //         console.log("parsed product data:");
// //         //console.log(products)
// //         return products})
// // }
