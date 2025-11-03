const {Client} = require('pg');

const con = new Client({
    host:"localhost",
    user: "postgres",
    port: 5432,
    password:"Laptop@hs",
    database:"demopost"
})
con.connect().then(()=>console.log("Connected"))