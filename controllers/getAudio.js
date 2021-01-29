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

conn.once('open', function () {
  console.log("connected");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

const getAudio = async (req, res) => {

  const collection = conn.collection('uploads.files');
  try {

    const record = await Details.findOne({ file_id: req.params.file_id });
    if (!record) {
      res.status(404).json({
        status: 404,
        msg: 'No file Found'
      })
      return
    }

    console.log('1', record)


    var audio;

    collection.findOne({ filename: req.params.filename }, async(err, file) => {
      console.log('2', file)
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      let readstream = gfs.createReadStream(file.filename);
      let total = file.length

      res.set('content-type', 'audio/mpeg');
      res.set('accept-ranges', 'bytes');

      if (req.headers['range']) {

        // Range request, partialle stream the file
        console.log('Range Reuqest');
        var parts = req.headers['range'].replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : file.length - 1;
        var chunksize = (end - start) + 1;

        console.log('Range ', start, '-', end);

        res.writeHead(206, {
          'Content-Range': 'bytes ' + start + '-' + end + '/' + file.length,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': file.contentType
        });

        var readStream = gfs.createReadStream(file.filename, { start: start, end: end });

        // write to response
        readStream.on('data', function (buff) {
          start += buff.length;
          if (start >= end) {
            // readStream.close();
            res.end();
          } else {
            res.write(buff);
          }
        });
        // });
      }
      else {
        console.log('No Range Request');
        res.header('Content-Type', file.contentType);
        res.header('Content-Length', file.length);
        var stream = gfs.createReadStream(file.filename);

        await record.updateOne({ number_of_streams: record.number_of_streams + 1 }, record)
          .then((record) => {
            () => {
              console.log('success', record)
            }
          })

        return stream.pipe(res)
        

        // if (audio != undefined || audio != '') {
        //   console.log('audio', audio)
        //   return audio;
        // } else {
        //   res.status(404).json({
        //     status: 404,
        //     err: 'connection error'
        //   })
        // }


        // return stream.pipe(res)
        // res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
        // let streams = new Streams({
        //   file_id: file._id,
        //   date: new Date().toISOString(),
        // });
        // streams.save();
        // let result = readstream.pipe(res)
        // audio = result;
      }



      // return readstream.pipe(res);
    })



  } catch (err) {
    res.status(500).json({
      status: 500,
      err: 'server error'
    })
  }
}

export default getAudio;



