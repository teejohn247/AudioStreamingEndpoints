import Details from '../model/Details';


const listAllUploads= async(req, res) => {
    let page = req.params.page;
    let limit = req.params.limit;
    try{
        // let { title, author, date } = req.body;
        let {title, author, date} = req.query

    
        console.log('here')
        console.log(title)

        var record = await Details.find()

        var filter = {};


        if(title){
            filter.title = title;
        };
        
        if(author){
            filter.author = author;
        };

        if(date){
            filter.date = date;
        };

        // if(tag_name){
        //   let ab = [];
        //   record.filter((a,i) => 
        //   console.log(a.tags[i].tag_name)
        //   )

        //   console.log('test', ab)
        //   return;

        //     // filter.tag_name = tag_name;
        // };

        
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