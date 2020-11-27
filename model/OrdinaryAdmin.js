import mongoose from 'mongoose';

const OrdinaryAdminSchema = new mongoose.Schema({
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
});

const OrdinaryAdmin = mongoose.model("admin", OrdinaryAdminSchema);
export default OrdinaryAdmin;
