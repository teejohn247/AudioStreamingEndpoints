import Downloads from '../model/Downloads';

const viewDownloads= async(req, res) => {
    
    try{
        const streamsrecords = await Downloads.find()
        console.log(streamsrecords)
        const count = await Downloads.find().countDocuments();
        
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
export default viewDownloads;