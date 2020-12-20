import Admin from '../model/Admin';


const getSuperAdmin = async(req, res) => {
    try{
       const result = await Admin.findOne({_id: req.payload.id});
       console.log(result)
       if(!result){
        {
            res.status(404).json({
                status:404,
                error:'Super Admin does not exist'
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
export default getSuperAdmin;