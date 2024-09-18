const router=require('express').Router();
const User=require('../Model/User')
const { authenticateToken }=require('./userAuth')

//Add book to Favourite..
router.put("/add-book-to-favourite",authenticateToken ,async (req,res)=>{
    try {
        
        const {bookid,id}= req.headers;
        const userData=await User.findById(id)
        const isBookFavourite= userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(403).json({
                message:"The Book is already exist in the favourite"
            })
        }
        else{
            await User.findByIdAndUpdate(id,{
                $push:{favourites:bookid}
            
            })
            return res.status(201).json({
                message: "Book added to the favourite"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "failed",
            message:"Someting error ouccured"
        })
    }
})


//Remove from favourite list
router.put("/remove-book-from-favourite",authenticateToken, async(req,res)=>{
    try {
        const {bookid,id}=req.headers;
        const userData= await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid)
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{
                $pull:{favourites:bookid}
            })
        }
        return res.status(200).json({
            status:"Success",
            message:"The book succesfully deleted from the favourite list"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "failed",
            message:"Someting error ouccured"
        })
    }
})


//get favourite books of a particular user 
router.get('/get-favourite-books',authenticateToken,async (req,res)=>{
    try {
        const {id}= req.headers;
        const userData=await User.findById(id).populate("favourites");
        const favouriteBooks=userData.favourites
        return res.status(200).json({
            status:"User Favourite books get successfully",
            data:favouriteBooks
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error occured"
        })
    }
})


module.exports=router