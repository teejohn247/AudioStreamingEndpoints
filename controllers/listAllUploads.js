import Details from '../model/Details';


const listAllUploads= async(req, res) => {
    let page = req.params.page;
    let limit = req.params.limit;
    try{
        // let { title, author, date } = req.body;
        let {title, author, date, tag_name} = req.query

    
        console.log('here')
        console.log(tag_name)

        var record = await Details.find()

        var filter = {};


        if(title){
            const s = title
            const regex = new RegExp(s, 'i') // i for case insensitive
            filter.title = {$regex: regex};
        };
        
        if(author){
            const s = author
            const regex = new RegExp(s, 'i') // i for case insensitive
            filter.author = {$regex: regex}
        };

        if(date){
            filter.date = date;
        };

       
   
    //  const records = await Tags.find(filter)
         const records = await Details.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        console.log(records)

        const count = await Details.find().countDocuments();
        
        console.log(count)
        if(!records){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }

        if(tag_name){
            const result = await Details.find(
                    { tags : { $elemMatch : { "tag_name" : `${tag_name}`} } }, filter
                );
              return res.status(200).json({
                status:200,
                result,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })
            };
        
        res.status(200).json({
            status:200,
            records,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default listAllUploads;