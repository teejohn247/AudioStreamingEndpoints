import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import Streams from '../model/Streams';
import Details from '../model/Details';
import dotenv from 'dotenv';



dotenv.config();

const mongoURI = process.env.MONGO_URL;



mongoose.connect(mongoURI);

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, "Error connecting to db"));
let gfs;

conn.once('open', function(){
    console.log("connected"); 
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

const getAudio = async (req, res) => {

      const collection = conn.collection('uploads.files'); 
      try{

        const record = await Details.findOne({file_id: req.params.file_id});
        if(!record){
            res.status(404).json({
                status:404,
                msg:'No file Found'
            })
            return
        }
      
        console.log('1',record)

       
       var audio;
        
      collection.findOne({ filename: req.params.filename }, (err, file) => {
        console.log('2',file)
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }
        let readstream = gfs.createReadStream(file.filename);


        let streams = new Streams({
          file_id: file._id,
          date: new Date().toISOString(),
        });

        streams.save();
        let result = readstream.pipe(res)
        audio = result;
        // return readstream.pipe(res);
    })

    await record.updateOne({ number_of_streams: record.number_of_streams + 1}, record)
    .then((record) => {
      () => {
        console.log('success', record)
      }
    })

    if(audio != undefined || audio != ''){
      console.log('audio', audio)
      return audio;
  }else{
      res.status(404).json({
          status:404,
          err:'connection error'
      })
  }

    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
  }
  
export default getAudio;
  