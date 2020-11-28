import Admin from '../model/OrdinaryAdmin';



const filterAdmins = async(req, res) => {
    try{
       
        let {name, email, phone_number} = req.body;

    
        console.log('here')
        console.log(name)

        var filter = {};


        if(name){
            filter.name = name;
        };
        if(email){
            filter.email = email;
        };
        if(phone_number){
            filter.phone_number = phone_number;
        };

       

        
       const records = await Admin.find(filter)
        // .limit(limit * 1)
        // .skip((page - 1) * limit)
        // .exec();
        console.log(records)

        console.log('here2')

        // const count = await AdminRecords.find({"email": email, "phone_number": phone_number, "name": name}).countDocuments();
        // console.log(count)


        if(!records){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
            return;
        }
        res.status(200).json({
            records,
            // totalPages: Math.ceil(count / limit),
            // currentPage: page
        })
        }catch(err){
            res.status(500).json({
                status:500,
                err:'server error'
            })
        }
}
export default filterAdmins;