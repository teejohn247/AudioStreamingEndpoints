import Details from '../model/Details';

const mostRecent= async(req, res) => {
    
    try{
        const streamsrecords = await Details.find()
        console.log(streamsrecords)

        const count = await Details.find().sort({_id:-1}).limit(10);
        
        console.log(count)
        if(!streamsrecords){
            res.json({
                count: 0
            })
        }
        res.status(200).json({
            status:200,
            count,
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default mostRecent;