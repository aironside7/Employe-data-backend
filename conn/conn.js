const mongoose= require("mongoose")

// mongoose.connect("")
mongoose.connect("mongodb+srv://ani:ani@cluster0.hs2bme8.mongodb.net/emplyedata?retryWrites=true&w=majority")
.then(()=>{
    console.log("Sucessfully connected with Database")
})
.catch((error)=>{
    console.log(error)
})