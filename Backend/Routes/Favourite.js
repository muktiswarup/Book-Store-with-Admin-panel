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

module.exports=router