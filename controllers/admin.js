import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../model/OrdinaryAdmin';
import utils from '../config/utils';

dotenv.config();

const admin = async (req, res) => {
    try{ 
        const {name, email, password, phone_number} = req.body;
        console.log(req.body.name);
        console.log(email);
        console.log(password);

        let admin = await Admin.findOne({ email });
        console.log(admin);

        if(admin){
            res.status(400).json({
                status: 400,
                error: 'This email address already exists'
            })
            return;
        }

        const salt = await bcrypt.genSalt(10);

        const hashed = await bcrypt.hash(password, salt);

        admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: hashed
        });
        console.log(admin);

        await admin.save();
        console.log( admin._id, admin.name, admin.email)
        const token = utils.encodeToken( admin._id, admin.name, admin.email )
        console.log(token);
        res.status(201).json({
            status: 201,
            token,
            admin
          })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}

export default admin;
