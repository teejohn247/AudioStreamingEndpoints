import Streams from '../model/Streams';

const getSingleStreams = async(req, res) => {
    try{
       const result = await Streams.find({ file_id: req.params.id });
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
            result: result.length
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default getSingleStreams;