import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    file_id: {
        type: String, 
        required: true
    },
    files: {
        type: Array,
        required: true
    },
    title: {
        type: String, 
        required: true,
    },
    author: {
        type: String, 
        required: false,
    },
    date: {
        type: String, 
        required: false,
    },
    tags: {
        type: Array, 
        required: false
    },
    description: {
        type: String, 
        required: false
    },
   
});

const Details = mongoose.model('details', dataSchema);

export default Details;