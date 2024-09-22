const router=require('express').Router();
const User=require('../Model/User');
const { authenticateToken }=require('./userAuth');
//Put book to cart

router.put("/add-to-cart",authenticateToken, async(req,res)=>{
    try {
        const {bookid,id}=req.headers;
        const userData= await User.findById(id)
        const isBookFavourite=userData.carts.includes(bookid)
        if(isBookFavourite){
            return res.status(404).json({
                status:"Failed",
                message:"The book is already in the cart"
            })
        }
        await User.findByIdAndUpdate(id,{
            $push:{carts:bookid}
        })
        return res.status(200).json({
            status:"success",
            message:"Book added successfully to the cart"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

//Remove from the cart
router.put("/remove-from-cart/:bookid",authenticateToken,async (req,res)=>{
    try {
        const {bookid}=req.params;
        const {id}=req.headers;
        const userData = await User.findById(id);
        const bookInCart = userData.carts.includes(bookid);
        if (!bookInCart) {
            return res.status(400).json({
                status: "Failed",
                message: "Book is not in the cart."
            });
        }

        await User.findByIdAndUpdate(id,{
            $pull:{carts:bookid}
        })
        return res.status(200).json({
            status:"Succesful",
            message:"Book removed from the cart."
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"internal server error"
        })
    }
})

//get cart of a particular user 
// Get cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Await the user data and populate the 'carts'
        const userData = await User.findById(id).populate('carts');

        // Check if the user exists and has a cart
        if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found."
            });
        }

        // Reverse the cart items
        const cart = userData.carts.reverse();

        return res.json({
            status: "Success",
            data: cart
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;


module.exports=router;