import Streams from '../model/Streams';

const viewStreams= async(req, res) => {
    
    try{
        const streamsrecords = await Streams.find()
        console.log(streamsrecords)
        const count = await Streams.find().countDocuments();
        
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
export default viewStreams;