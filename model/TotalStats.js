import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    file_id: {
        type: String, 
        required: true
    },
    number_of_streams: {
        type: Number, 
        required: false
    },
    number_of_downloads: {
        type: Number, 
        required: false
    },
    
});

const TotalStats = mongoose.model('stats', dataSchema);
export default TotalStats;