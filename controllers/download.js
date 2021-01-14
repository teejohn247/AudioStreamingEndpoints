import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import Downloads from '../model/Downloads';
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
      
        console.log(record)

       
       let audio;

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
       
        let result = readStream.pipe(res)
        audio = result;
       
    })

    await record.updateOne({ number_of_downloads: record.number_of_downloads + 1}, record)
    .then((record) => {
      () => {
        console.log('success', record)
      }
    })
    if(audio !== undefined || audio !== empty){
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
  