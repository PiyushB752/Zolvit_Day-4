import express from "express"
import connect from "./database/connection.js"
import userModel from "./model/user.model.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    try{
        userModel.find({}).then((data)=>{
            res.json(data)
        }).catch((err)=>{
            res.json({err})
        })
    } catch(err){
        res.json({err})
    }
})

app.post("/add",(req,res)=>{
    try{
        const user = new userModel({
            username:"PIyush B"
        })

        user.save().then(function(){
            return res.json({message:"Data has been added."})
        }).catch((err)=>{
            return res.json({err})
        })
    }catch(err){

    }
})

connect().then(()=>{
    try{
        app.listen(PORT,()=>{
            console.log(`Server is connected to PORT: ${PORT}`)
        })
    } catch(err){
        console.log("Cannot connect to server...")
    }
}).catch((err)=>{
    console.log("Invalid Database Connection !!!")
})

export default app