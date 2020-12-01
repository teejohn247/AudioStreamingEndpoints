import Details from '../model/Details';


import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

const mongoURI = "mongodb://teejohn247:Wisdom123.@cluster0-shard-00-00.f53iq.mongodb.net:27017,cluster0-shard-00-01.f53iq.mongodb.net:27017,cluster0-shard-00-02.f53iq.mongodb.net:27017/audio?ssl=true&replicaSet=atlas-tu9bmp-shard-0&authSource=admin&retryWrites=true&w=majority"


mongoose.connect(mongoURI);

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, "Error connecting to db"));
let gfs;

conn.once('open', function(){
    console.log("connected"); 
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})


const delFile = async(req, res) => {
    try{
       const result = await Details.findOne({ file_id: req.params.file_id });
       if(!result){
        {
            res.status(404).json({
                status:404,
                error:'File does not exist'
            })
            return
        }
       }
       let id_file = result.files[1].id;
       console.log('ww',id_file);
       const obj_id = new mongoose.Types.ObjectId(req.params.file_id);
       console.log('dd',obj_id);

        console.log(id_file)
        await gfs.remove({ _id: req.params.file_id, root: 'uploads' }, (err) => {
            if (err) {
            return res.status(404).json({ err: err });
        } 
            console.log('success')
        })

       console.log('deleted')

        await gfs.remove({ _id: id_file, root: 'uploads' }, (err) => {
            if (err) {
            return res.status(404).json({ err: err });
        } 
           console.log('success')
       })

       
        
        await Details.deleteOne({ file_id: req.params.file_id});
        res.status(200).json({
            status:200,
            msg:'File Deleted'
        })
      
    }catch(err){
            res.status(500).json({
                status:500,
                err:'server error'
            })
        }
    }
export default delFile;