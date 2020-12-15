import mongoose from 'mongoose';

const StreamsSchema = new mongoose.Schema({
    file_id: {
        type: String, 
        required: true
    },
    date:{
        type:Date,
        required:true,
    },
});

const Streams = mongoose.model("streams", StreamsSchema);
export default Streams;
