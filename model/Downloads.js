import mongoose from 'mongoose';

const DownloadsSchema = new mongoose.Schema({
    file_id: {
        type: String, 
        required: true
    },
    date:{
        type:Date,
        required:true,
    },
});

const Downloads = mongoose.model("downloads", DownloadsSchema);
export default Downloads;
