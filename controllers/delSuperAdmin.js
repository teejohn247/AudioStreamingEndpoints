import Admin from '../model/OrdinaryAdmin';
import SuperAdmin from '../model/Admin';



const delUser = async(req, res) => {
    try{
       const result = await SuperAdmin.findOne({_id: req.payload.id});
       await SuperAdmin.deleteOne({ _id: req.params.id});
       console.log(result)
       if(!result){
        {
            res.status(404).json({
                status:404,
                error:'ACCESS DENIED. Only a super-admin is allowed to delete this account'
            })
            return
        }
       }
        res.status(200).json({
            status:200,
            msg:'Admin account deleted'
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default delUser;