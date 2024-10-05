const router=require('express').Router();
const { authenticateToken }=require('./userAuth')
const Book=require('../Model/books')
const Order=require("../Model/order")
const User=require('../Model/User')

//Place order

router.post("/place-order",authenticateToken, async(req,res)=>{
    try {
        const {id}=req.headers;
        const {order}=req.body;
        for(const orderData of order){
            const neworder=new Order({
                user:id,
                book:orderData._id
            })
            const orderDatafroMDb=await neworder.save();
            //saving order in usermodel
            await User.findByIdAndUpdate(id,{
                $push:{orders:orderDatafroMDb._id}
            })
            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull:{carts:orderData._id}
            })
            
        }
        return res.status(200).json({
            status:"success",
            message:"Order placed succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messge:"server error occured"
        })
    }
})

//get order history of a particular user

router.get('/get-order-history',authenticateToken, async(req,res)=>{
    try {
        const {id}=req.headers;
        const userdata=await User.findById(id).populate({
            path: "orders",
            populate:{path:"book"}
        })
        const orderData=userdata.orders.reverse();
        return res.status(200).json({
            status:"success",
            data:orderData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messge:"server error occured"
        })
    }
})

//get all order by admin

router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try {
        const userdata= await Order.find().populate({
            path:"book"
        })
        .populate({
            path:"user"
        })
        .sort({createdAt:-1})
        res.status(200).json({
            status:"success",
            data:userdata
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messge:"server error occured"
        })
    }
})

//update order by admin

router.put("/update-status/:id",authenticateToken,async (req,res)=>{
    try {
        
        const {id}=req.params
        await Order.findByIdAndUpdate(id,
            {status:req.body.status}
        )
        return res.status(200).json({
            status:"success",
            message:"status updated successfully"
        })
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            messge:"server error occured"
        })
    }
})
module.exports= router;