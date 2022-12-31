const express = require("express")
const cors = require('cors')
const { body, validationResult } = require("express-validator");
// let InstaUser = require("../module/schema")
const Empdata = require("./model/model")

require("./conn/conn")

// const User = require("../module/userSchema");
// const bcrypt = require("bcrypt");


// const register = require("../module/userSchema")
// const auth = require('./auth')
const app = express()
app.use(cors())
const bodyparser = require("body-parser")
app.use(bodyparser())

let port = process.env.PORT || 8000

const fileupload = require("express-fileupload");
const { get } = require("mongoose");
var cloudinary = require("cloudinary").v2;
app.use(fileupload({
    useTempFiles: true
}))

cloudinary.config({
    cloud_name: "dxfkj6qru",
    api_key: "671759823811938",
    api_secret: "mz5yIRM--5-NYzSgcYSZs_pUG0w",
    secure: true
})

// app.use("/api/auth", auth)


// const router = require("express").Router();


//REGISTER
// app.post("/register", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPass,
//     });

//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




app.post("/user/upload",
body("name"),
  body("phone"),
  body("gender"),
  body("salary"),


async(req, res) => {
    try{
        const errors = validationResult(req);
        const file = req.files.image
        if (!errors.isEmpty()) {
            return res.status(400).json({
              status: "failed",
              message: "invalid data for user registeration",
              errors: errors.array(),
            });
          }else{
            await cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
                Empdata.create({
                     name:req.body.name,
                     image:result.url,
                     phone:req.body.phone,
                     gender:req.body.gender,
                     salary:req.body.salary
                 })
             })
             res.send("data uploaded sucessfully")
          }
         
    }
    catch(err){
        console.log(err)
    }
})
// app.put("/user/update/:id",async(req, res) => {
//     try{
//         const file = req.files.image
        // const currentemp = await Empdata.findById(req.params.id);
        // const data = {
        //     name:req.body.name,
        //     phone:req.body.phone,
        //     gender:req.body.gender,
        //     salary:req.body.salary
        // }
        // if (req.body.image !== '') {
        //     const ImgId = currentemp.image.public_id;
        //     if (ImgId) {
        //         await cloudinary.uploader.destroy(ImgId);
        //     }

        //     const newImage = await cloudinary.uploader.upload(req.body.image, {
        //         folder: "products",
        //         width: 1000,
        //         crop: "scale"
        //     });

        //     data.image = {
        //         public_id: newImage.public_id,
        //         url: newImage.secure_url
        //     }
        // }
        //  await Empdata.findOneAndUpdate(req.params.id, data, { new: true })
        // res.send("data updateddd sucessfully")  
//        await cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
//            Empdata.findByIdAndUpdate({
//                 name:req.body.name,
//                 image:result.url,
//                 phone:req.body.phone,
//                 gender:req.body.gender,
//                 salary:req.body.salary
//             })
//         })
//         res.send("data updated sucessfully")  
//     }
//     catch(err){
//         console.log(err)
//     }
// })
app.delete("/del/:id", async(req,res)=>{
    try{
        const _id =req.params.id
        const delemp= await Empdata.findByIdAndDelete(_id)
        res.send(delemp)
    }catch(e){
       res.status(500).send(e)
    }
})

app.patch("/user/update/:id", async(req,res)=>{
    try{
        
        const _id =req.params.id
        // await cloudinary.v2.uploader.destroy(public_id)
        // await cloudinary.v2.uploader.upload(avatar.url, {
        //     public_id: avatar.public_id,
        //   });
        const empupdate = await Empdata.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        res.send(empupdate)
       
    }catch{

    }
})

app.get("/user", async (req, res) => {
    try {
        
        const profile = await Empdata.find()
        res.json({
            profile
        })
        console.log(profile)
    }
    catch (e) {
        console.log(e)
    }
})
app.get("/user/:id", async (req, res) => {
    try {
        const _id =req.params.id
        const singleprofile = await Empdata.findById(_id)
        res.send(singleprofile)
        
    }
    catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`server runnin at ${port}`)
})

