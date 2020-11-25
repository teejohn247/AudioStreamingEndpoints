import mongoose from 'mongoose';
import moment from 'moment';

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
    super_admin:{
        type:Boolean,
        required:true
    },
});

const Admin = mongoose.model("adminRelationship", AdminSchema);
export default Admin;
