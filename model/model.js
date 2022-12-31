
const mongoose= require("mongoose")


const userSchema= new mongoose.Schema({
  
    
    
    name:{type:String, require:true,},
    image:{type:String},
    phone:{type:String,require:true},
    gender:{type:String,require:true},
    salary:{type:String,require:true}, 
})
// userSchema.pre('validate', function () {
//     if ((this.isNew || this.isModified) && this.username) {
//       this.name = this.name.toLowerCase();
//       this.phone = this.name.toLowerCase();
//       this.name = this.name.toLowerCase();
//       this.name = this.name.toLowerCase();
//     }
//   });
const Empdata=mongoose.model("empdatas",userSchema)

module.exports=Empdata