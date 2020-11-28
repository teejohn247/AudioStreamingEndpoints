import Tags from '../model/Tags';


const filterTags = async(req, res) => {
    try{
        let { tag_name, tag_color} = req.body;

    
        console.log('here')
        console.log(tag_name)

        var filter = {};


        if(tag_name){
            filter.tag_name = tag_name;
        };
        
        if(tag_color){
            filter.tag_color = tag_color;
        };

       

        
       const records = await Tags.find(filter)
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
export default filterTags;