const express= require('express');
require('dotenv').config();
require('./Connection/dbConc')
const user=require('./Routes/user')

const PORT=process.env.PORT || 1000;

const app= express();

app.use(express.json())
app.use("/api/v1",user)


app.get('/',(req,res)=>{
    res.send("Hello world");
})
app.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`The server has started in the ${'http://localhost:3000'}`)
})