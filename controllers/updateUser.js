import Admin from '../model/OrdinaryAdmin';


const updateAdmin = async (req, res) => {
  try {
        const admin = await Admin.findById(req.payload.id);
        if(!admin){
            res.status(404).json({
                status:404,
                msg:'No admin Found'
            })
            return
        }
        admin.updateOne({ name: req.body.name, email: req.body.email, phone_number: req.body.phone_number}, admin).then(
            () => {
              res.status(200).json({
                status:200,
                "email": req.body.email,
                "password": req.body.password,
                "phone_number": req.body.phone_number
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

export default updateAdmin;
