const {Client} = require('pg');
const express = require('express');
const app = express();
app.use(express.json());
//client is the pg stuff we installed for Postgress
const con = new Client({
    host:"localhost", //because its on our pc we us localhost
    user: "postgres",
    port: 5432,
    password:"Laptop@hs",
    database:"demopost"
})
con.connect().then(()=>console.log("Connected"))

//-------------Part2--------------
app.post('/postData',(req,res)=>{

    const {name, id} = req.body;
    const insert_query = 'INSERT INTO demotable(name, id) VALUES($1,$2)';
    con.query(insert_query,[name,id],(err,result) =>{
        if(err)
        {
            res.send(err);
        }
        else{
            console.log(result);
            res.send("Posted Data!")
        }
    })
})

app.listen(3000,()=>{
    console.log("Server is running...");
})