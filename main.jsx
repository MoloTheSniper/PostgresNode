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

//-------------Posting data into data base--------------
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

//----------------Getting data from database------------
app.get('/getData',(req,res)=>{
    const get_query = 'SELECT * FROM demotable';
    con.query(get_query,(err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            //console.log(result);
            res.send(result.rows);
        }
    })
})
//----------------Getting data by Id---------------

app.get('/getData/:id',(req,res)=>{
    const id = req.params.id;
    const get_query = "SELECT * FROM demotable WHERE id = $1";
    con.query(get_query,[id],(err,result)=>{
        if(err)
        {
            res.send(err)
        }else{
            res.send(result.rows)
        }
    }) //id = $1
})

app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;

    const update_query ="UPDATE demotable SET name = $1 WHERE id = $2";
    con.query(update_query,[name,id],(err,result)=>{
        if(err)
        {
            res.send(err)
        }else{
            res.send("UPDATED")
        }
    })

})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    const delete_query = "DELETE FROM demotable WHERE id = $1";
    con.query(delete_query,[id],(err,result)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
app.listen(3000,()=>{
    console.log("Server is running...");
})