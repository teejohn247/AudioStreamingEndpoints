import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import Downloads from '../model/Downloads';


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

const getAudio = async (req, res) => {

      const collection = conn.collection('uploads.files'); 
      try{

      collection.findOne({ filename: req.params.filename }, (err, file) => {
        console.log(file)
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }
        // const readstream = gfs.createReadStream(file.filename);
        // detect the content type and set the appropriate response headers.
        let mimeType = file.contentType;
        if (!mimeType) {
            mimeType = mime.lookup(file.filename);
        }
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': 'attachment; filename=' + file.filename
        });

        const readStream = gfs.createReadStream(file.filename);
        readStream.on('error', err => {
            // report stream error
            console.log(err);
        });
        let downloads = new Downloads({
          file_id: file._id,
          date: new Date().toISOString(),
        });
        console.log(downloads);
        downloads.save();
       
        return readStream.pipe(res);
       
    })
      

    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
  }
  
export default getAudio;
  