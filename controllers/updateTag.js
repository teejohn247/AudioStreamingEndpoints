import Tags from '../model/Tags';


const updateTag = async (req, res) => {
  try {
    console.log(req.params._id)
    console.log('here')

        const tag = await Tags.findById(req.params._id);
        console.log(tag)
        if(!tag){
            res.status(404).json({
                status:404,
                msg:'No tag Found'
            })
            return
        }
        // if(tag.tag_name == req.body.tag_name){
        //   res.status(403).json({
        //     status:403,
        //     msg:'tag name already exists'
        // })
        // return

        // }
        console.log(tag)
        tag.updateOne({ tag_name: req.body.tag_name, tag_color: req.body.tag_color, date: req.body.date}, tag).then(
            () => {
              res.status(200).json({
                status:200,
                "tag_name": req.body.tag_name,
                "tag_color": req.body.tag_color,
                "date": req.body.date,
              });
            }
          )     
    }
    catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
};

export default updateTag;
