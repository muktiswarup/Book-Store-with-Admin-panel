const express= require('express');
require('dotenv').config();
require('./Connection/dbConc')
const cors=require('cors')

const User=require('./Routes/user')
const Books=require('./Routes/book')
const Favourite= require('./Routes/Favourite')
const Cart=require("./Routes/cart")
const Order=require("./Routes/order")

const PORT=process.env.PORT || 1000;

const app= express();

app.use(cors());
app.use(express.json())
app.use("/api/v1",User)
app.use("/api/v1",Books)
app.use("/api/v1",Favourite)
app.use("/api/v1",Cart)
app.use("/api/v1",Order)



app.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`The server has started in the ${'http://localhost:3000'}`)
})