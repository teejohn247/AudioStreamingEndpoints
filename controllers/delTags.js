import Tags from '../model/Tags';


const delTags = async(req, res) => {
    try{
        await Tags.deleteOne({ _id: req.params.id});
        res.status(200).json({
            status:200,
            msg:'Tag Deleted'
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default delTags;