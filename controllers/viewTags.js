import Tags from '../model/Tags';

const viewTags= async(req, res) => {
    let page = req.params.page;
    let limit = req.params.limit;
    try{
        const tagsrecords = await Tags.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        console.log(tagsrecords)

        const count = await Tags.find().countDocuments();
        
        console.log(count)
        if(!tagsrecords){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }
        
        res.status(200).json({
            status:200,
            tagsrecords,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
        console.log(tagsrecords)
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default viewTags;