import mongoose from 'mongoose';
import moment from 'moment';


const AdminSchema = new mongoose.Schema({

resetPasswordToken: {
    type: String,
    required: true
},

resetPasswordExpires: {
    type: Date,
    required: true
}

})