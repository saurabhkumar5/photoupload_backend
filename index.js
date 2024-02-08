const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))
mongoose.connect("mongodb://127.0.0.1:27017/imagebased64")
.then(()=>{
    console.log("conneect to db")
}).catch((err)=>{
    console.log(err)
})

const schema = new mongoose.Schema({
    image : String
})
const imageModel = mongoose.model("image",schema)



app.get("/",async(req,res)=>{
    const data = await imageModel.find({})
    res.json({message:"all image",data:data})
})

app.post("/upload",async(req,res)=>{
    console.log(req.body)
    const image = new imageModel({
        image : req.body.img
    })
    await image.save()
    res.send({message : "image upload successfully",success : true})
})

app.listen(8080,()=>console.log("server is running"))