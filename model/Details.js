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
    tags: [{
        tag_name: {
            type: String,
            required: true,
        },
        tag_color: {
            type: String,
            required: true,
        }
    }],
    
    description: {
        type: String, 
        required: false
    },
    number_of_streams: {
        type: Number, 
        required: true
    },
    number_of_downloads: {
        type: Number, 
        required: true
    },
    
});

const Details = mongoose.model('details', dataSchema);

export default Details;