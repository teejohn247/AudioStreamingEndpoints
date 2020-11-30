import mongoose from 'mongoose';

const url = "mongodb://teejohn247:Wisdom123.@cluster0-shard-00-00.f53iq.mongodb.net:27017,cluster0-shard-00-01.f53iq.mongodb.net:27017,cluster0-shard-00-02.f53iq.mongodb.net:27017/audio?ssl=true&replicaSet=atlas-tu9bmp-shard-0&authSource=admin&retryWrites=true&w=majority"

 const connectDB = async () => {
     try{
         await mongoose.connect(url, {
             useNewUrlParser:true,
             useUnifiedTopology: true 
         });
         console.log('MongoDb connected...')
     } catch (err){
         console.error(err.message);
         process.exit(1);
     }
    }
  export default connectDB;