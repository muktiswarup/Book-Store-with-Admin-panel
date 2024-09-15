const mongoose= require('mongoose');
const connectionUri= process.env.URI
const Connectionn= async()=>{
    try {
        await mongoose.connect(connectionUri)
        .then(()=>{
            console.log("Database connected Successfully")
        })
    } catch (error) {
        console.log("Failed to connect the database",error)
    }
}
Connectionn();
module.exports= Connectionn;