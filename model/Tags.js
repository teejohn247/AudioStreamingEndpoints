import mongoose from 'mongoose';


const TagsSchema = new mongoose.Schema({

tag_name: {
    type: String,
    required: true
},

tag_color: {
    type: String,
    required: true
}

})

const Tags = mongoose.model("tags", TagsSchema);
export default Tags;