import mongoose from 'mongoose';


const TagsSchema = new mongoose.Schema({

tag_name: {
    type: String,
    required: true
},

tag_color: {
    type: String,
    required: true
},

date: {
    type: String,
    required: false
}

})

const Tags = mongoose.model("tags", TagsSchema);
export default Tags;