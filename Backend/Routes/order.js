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
            message:"server error occured"
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

router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { states } = req.body; // Ensure you get 'states' from request body
        
        // Update the correct field (states instead of status)
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { states }, // Correct field name
            { new: true } // Option to return updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Order status updated successfully",
            data: updatedOrder
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Server error occurred"
        });
    }
});



//delete all order by admin
router.delete("/delete-all-orders", authenticateToken, async (req, res) => {
    try {
        // Assuming you have user role management, check if the user is admin

        // Delete all orders
        await Order.deleteMany();

        res.status(200).json({
            status: "success",
            message: "All orders deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error occurred"
        });
    }
});

module.exports= router;
