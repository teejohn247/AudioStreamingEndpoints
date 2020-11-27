import dotenv from 'dotenv';
import Tags from '../model/Tags';

dotenv.config();

const tags = async (req, res) => {
    try{ 
        const {tag_name, tag_color} = req.body;
        console.log(tag_name);
        console.log(tag_color);

        let tag = await Tags.findOne({ tag_name });
        console.log(tag);

        if(tag){
            res.status(400).json({
                status: 400,
                error: 'This tag name already exists'
            })
            return;
        }
        tag = new Tags({
            tag_name,
            tag_color
        });
        console.log(tag);

        await tag.save();
        res.status(201).json({
            status: 201,
            tag
          })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}

export default tags;
