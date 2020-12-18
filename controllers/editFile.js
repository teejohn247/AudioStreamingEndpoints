import Details from '../model/Details';

const editFile = async (req, res) => {
  try {
        const record = await Details.findOne({file_id: req.params.file_id});
        if(!record){
            res.status(404).json({
                status:404,
                msg:'No file Found'
            })
            return
        }
        record.updateOne({ title: req.body.title, tags: req.body.tags, author: req.body.author, description: req.body.description}, record).then(
            () => {
              res.status(200).json({
                status:200,
                "title": req.body.title,
                "author": req.body.author,
                "description": req.body.description,
                "tags": req.body.tags
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

export default editFile;
