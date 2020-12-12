import Tags from '../model/Tags';


const ViewTag = async (req, res) => {
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
        
        console.log(tag)
       
              res.status(200).json({
                status:200,
                tag
              });
             
    }
    catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
};

export default ViewTag;
