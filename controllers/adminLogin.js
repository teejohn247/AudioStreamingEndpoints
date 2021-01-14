import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../model/OrdinaryAdmin';
import utils from '../config/utils';

dotenv.config();

const user = async (req, res) => {

    try{ 
        const {email, password} = req.body;
        let user = await Admin.findOne({ email });
        if(!user){
            res.status(400).json({
                status: 400,
                error: 'Incorrect Email or Password'
            })
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           res.status(404).json({
               status: 404,
               error: 'Invalid login credentials'
           })
           return;
        }
        const token = utils.encodeToken( user.id, user.name, user.email );
        res.status(200).json({
            token,
            user
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}

export default user;
