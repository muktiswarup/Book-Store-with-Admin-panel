const router= require('express').Router();
const User= require('../Model/User');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const {authenticateToken}= require("./userAuth")


// Api for sign-up page
router.post('/sign-up', async(req,res)=>{
    try {
        const {username,email,password,address}=req.body;

        // username length must be more than 4
        if(username.length <4){
            return res.status(400).json({
                msz:"User name length must be greater than 3"
            })
        }

        // Check existing username in the database
        const existingusername= await User.findOne({username:username})
        if(existingusername){
           return res.status(400).json({
                msz: "The user is already exist"
            })
        }

        // Check email is already exist in the database
        const existingemail= await User.findOne({email:email});
        if(existingemail){
           return res.status(400).json({
                msz:"This email is already exist "
            })
        }

        //check the password is greater 5 or not
        if(password.length<6){
           return res.status(400).json({
                msz:"The password length must be greater then 5"
            })
        }

        const hashpass= await bcrypt.hash(password,10)

        //if in the above condition all statisfied then the user profile will be created
        const newuser= new User({
            username:username,
            email:email,
            password:hashpass,
            address:address
        })
        await newuser.save();
        return res.status(200).json({
            msz: "User details created successfully"
        })
        


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msz: "Internal server error"
        })
    }
})



//Api for sign-in page..

router.post('/sign-in', async (req,res)=>{

    try {
        const {username,password}= req.body;

        const existinguser= await User.findOne({username:username})

        // Check user exist or not in the database 
        if(!existinguser){
            return res.status(400).json({
                msz:"Username not existing please give correct credential."
            })
        }

        // if the user exist in the database then compare the user passwprd with the datbase password 
        await bcrypt.compare(password,existinguser.password,(err,data)=>{
            const secretkey=process.env.SECRETE_KEY
            if(data){
                const authclaims=[
                    {
                        name:existinguser.username,
                    },
                    {
                        role:existinguser.role
                    }
                ]
                const token= jwt.sign({authclaims},secretkey,{expiresIn: "30d"})
               return res.status(200).json({
                    id:existinguser._id,
                    role:existinguser.role,
                    token:token
                })
            }
            else{
               return res.status(400).json({
                    msz:"invalid password please try again"
                })
            }
        })

    } catch (error) {
        return res.status(500).json({
            msz:"Internal Server Error"
        })

    }
})



//get user inforamation...
router.get('/get-user-information',authenticateToken, async (req,res)=>{
    try {
        const {id}= req.headers;
        const data= await User.findById(id).select("-password")
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            msz:"Internal error"
        })
    }
})

//update user information
router.put("/update-address",authenticateToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const {address} =req.body;
        await User.findByIdAndUpdate(id,{address:address})
        return res.status(200).json(
            {
                message:"User address successfully updated"
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})


module.exports= router;
