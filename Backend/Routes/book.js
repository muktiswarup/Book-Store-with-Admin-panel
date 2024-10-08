const mongoose = require('mongoose');
const router = require("express").Router();
const Book = require("../Model/books");
const User = require("../Model/User");
const { authenticateToken } = require("./userAuth");

// Add Book By the admin

router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    //Check who are trying to login admin or user
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({
        message:
          "You are not authorized to access this.Only admin can access it",
      });
    }

    //if above condition satisfied then new book added to the list
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    return res.status(200).json({
      message: "Book added succesfully by the admin",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//update Books by the admin

router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(201).json({
      messaze: "Book updated successfully by the admin",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

//Delete Books by the admin

router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({
      message: "Book deleted by the admin successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal server error"
    })
  }
});

//Get all the books 

router.get('/get-all-books', async (req,res)=>{
    try {
        const books= await Book.find().sort({createdAt:-1})
        return res.status(200).json({
            status:"Success",
            data:books
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error"
        })
    }
})

//Get recently added books limit 4

router.get('/get-recently-books',async (req,res)=>{
    
    try {
        const books= await Book.find().sort({createdAt:-1}).limit(4)
        res.status(200).json({
        status: "Success",
        data:books
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal server error'
        })
    }
})


//Get particular book details by id 

router.get('/get-book-by-id/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
  }

  try {
      const book = await Book.findById(id);
      if (!book) {
          return res.status(404).json({ message: 'Book not found' });
      }

      res.status(200).json({
          status: 'Success',
          data: book
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
