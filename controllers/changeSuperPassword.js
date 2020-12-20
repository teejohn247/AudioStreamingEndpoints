import bcrypt from 'bcrypt';
import Admin from '../model/Admin';




const changeSuperPassword = async (req, res) => {
  try {
        let { password, new_password } = req.body;

        const user = await Admin.findOne({email: req.payload.email});
        console.log(user)
      
        if(!user){
            res.status(404).json({
                status:404,
                error:'No user Found'
            })
            return
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
        res.status(404).json({
        status: 404,
        error: 'Wrong Password'
      })
      return;
    }

    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    const hashed = await bcrypt.hash(new_password, salt);
        console.log(user)
         user.updateOne({
         password: hashed,
        },    
         user).then(
            () => {
              res.status(200).json({
              status:200,
              msg:"Password successfully changed"
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

export default changeSuperPassword;





