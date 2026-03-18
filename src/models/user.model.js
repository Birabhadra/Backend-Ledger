import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
dotenv.config()
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        unique:[true,"Email already exists"]
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"password should contain more than 6 characters"],
        select:false
    },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return
    }
    const hash=await bcrypt.hash(this.password,10)
    this.password=hash
    return
    
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

const userModel=mongoose.model("user",userSchema)
export default userModel;