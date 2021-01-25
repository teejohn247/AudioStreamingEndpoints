import Admin from '../model/OrdinaryAdmin';


const viewSingleAdmin = async(req, res) => {
    try{
       const result = await Admin.findOne({_id: req.payload.id});
       console.log(result)
       if(!result){
        {
            res.status(404).json({
                status:404,
                error:'Admin does not exist'
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
export default viewSingleAdmin;