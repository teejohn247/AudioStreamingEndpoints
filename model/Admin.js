import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    new_password:{
        type:String,
        required:false
    },
    super_admin:{
        type:Boolean,
        required:true
    },
});

const Admin = mongoose.model("superAdmin", AdminSchema);
export default Admin;
