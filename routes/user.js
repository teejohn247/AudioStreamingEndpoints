import express from 'express';
import GridFsStorage from 'multer-gridfs-storage';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import superAdmin from '../controllers/superAdmin';
import superAdminLogin from '../controllers/superAdminLogin';
import changePassword from '../controllers/changePassword';
import admin from '../controllers/admin';
import adminLogin from '../controllers/adminLogin';
import updateSuperAdmin from '../controllers/updateSuperAdmin';

import viewTag from '../controllers/ViewTag';

import viewAdmin from '../controllers/viewAdmin';
import viewSuperAdmin from '../controllers/viewSuperAdmin';

import viewSingleAdmin from '../controllers/viewSingleAdmin';
import deleteAdmin from '../controllers/delAdmin';
import deleteSuperAdmin from '../controllers/delSuperAdmin';
import updateAdmin from '../controllers/updateAdmin';



import create_tags from '../controllers/tags';

import getTotal from '../controllers/getTotal';

import tags from '../controllers/updateTag';
import viewTags from '../controllers/viewTags';
import delTags from '../controllers/delTags';
import filterTags from '../controllers/filterTags';
import filterAdmin from '../controllers/filterAdmins';
import details from '../controllers/saveDes';
import getAudio from '../controllers/getAudio';
import getAll from '../controllers/listAllUploads';
import viewSingleFile from '../controllers/viewSingleFile';
import getStreams from '../controllers/getStreams';
import auth from '../middleware/auth';
import adminAuth from '../middleware/adminAuth';
import delFile from '../controllers/delFile';
import editFile from '../controllers/editFile';
import getSingleStream from '../controllers/getSingleStreams';
import getAllDownloads from '../controllers/getAllDownloads';
import getSingleDownloads from '../controllers/getSingleDownloads';
import viewSingleSuperAdmin from '../controllers/getSuperAdmin';
import mostDownloads from '../controllers/mostDownloads';
import mostRecent from '../controllers/mostRecent';
import changeSuperAdmin from '../controllers/changeSuperPassword';
import dotenv from 'dotenv';

import download from '../controllers/download';
import mostStreams from '../controllers/mostStreams';

dotenv.config();
 
// const url = process.env.MONGO_URL;
// "mongodb://teejohn247:Wisdom123.@cluster0-shard-00-00.f53iq.mongodb.net:27017,cluster0-shard-00-01.f53iq.mongodb.net:27017,cluster0-shard-00-02.f53iq.mongodb.net:27017/audio?ssl=true&replicaSet=atlas-tu9bmp-shard-0&authSource=admin&retryWrites=true&w=majority"

const router = express.Router();
const mongoURI = process.env.MONGO_URL;

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      console.log(file)
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          let fileId = file.mimetype;
          console.log('file', fileId)
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
            
              filename: filename,
              bucketName: 'uploads',
              // metadata: updateMetadata ? updateMetadata: null
      
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });


router.post('/upload_file', upload.any(), details)
router.post('/super_admin/signup', superAdmin);
router.post('/super_admin/login', superAdminLogin);
router.post('/admin/signup', [auth, adminAuth], admin);
router.post('/admin/login', adminLogin);
router.patch('/admin/change_password', auth, changePassword);
router.patch('/super_admin/change_password', [auth, adminAuth], changeSuperAdmin);
router.patch('/admin/update_admin',auth, updateAdmin);
router.patch('/admin/update_super_admin',[auth, adminAuth], updateSuperAdmin);
router.get('/admin/total_messages',auth, getTotal);
router.get('/admin/view/:id', auth, viewSingleAdmin);
router.delete('/admin/delete/:id', [auth, adminAuth], deleteAdmin);
router.delete('/admin/delete_super_admin/:id', [auth, adminAuth], deleteSuperAdmin);
router.post('/admin/create_tags', [auth, adminAuth], create_tags);
router.patch('/admin/update_tags/:_id', [auth, adminAuth], tags);
router.get('/admin/get_super_admin/:_id', [auth, adminAuth], viewSingleSuperAdmin);
router.get('/admin/view_tags/:page/:limit', viewTags);
router.get('/admin/view_admin/:page/:limit', [auth, adminAuth], viewAdmin);
router.get('/admin/view_super_admin/:page/:limit', [auth, adminAuth], viewSuperAdmin);
router.get('/admin/filter_tags', filterTags);
router.get('/admin/single_tag/:_id',auth, viewTag);
router.get('/admin/filter_admin', [auth, adminAuth], filterAdmin);
router.delete('/admin/delete_tag/:id', [auth, adminAuth], delTags);
router.delete('/admin/delete_file/:file_id', auth, delFile);
router.get('/file/:filename/:file_id', getAudio);


router.get('/download/:filename/:file_id', download);


router.get('/all_files/:page/:limit', getAll);
router.get('/most_stream', mostStreams);
router.get('/most_downloads',  mostDownloads);
router.get('/most_recent',  mostRecent);
router.get('/stream_data', [auth, adminAuth], getStreams);
router.get('/stream_single_data/:id', [auth, adminAuth], getSingleStream);
router.get('/all_downloads', [auth, adminAuth], getAllDownloads);
router.get('/single_download/:id', [auth, adminAuth], getSingleDownloads);
router.get('/view_file/:id', viewSingleFile);
// router.get('/view_file/:id', viewSingleFile);
router.patch('/edit_file/:file_id', editFile);


export default router;