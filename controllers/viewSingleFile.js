import Details from '../model/Details';


const viewSingleFile = async(req, res) => {
    try{
       const result = await Details.findOne({ file_id: req.params.id });
       console.log(result)
       if(!result){
        {
            res.status(404).json({
                status:404,
                error:'File does not exist'
            })
            return
        }
       }
        
        res.status(200).json({
            status:200,
            msg:'Success',
            result
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default viewSingleFile;