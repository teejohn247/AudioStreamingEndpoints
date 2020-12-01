import express from 'express';
import superAdmin from '../controllers/superAdmin';
import superAdminLogin from '../controllers/superAdminLogin';
import changePassword from '../controllers/changePassword';
import admin from '../controllers/admin';
import adminLogin from '../controllers/adminLogin';
import updateAdmin from '../controllers/updateUser';
import viewAdmin from '../controllers/viewAdmin';
import viewSingleAdmin from '../controllers/viewSingleAdmin';
import deleteAdmin from '../controllers/delAdmin';
import create_tags from '../controllers/tags';
import tags from '../controllers/updateTag';
import viewTags from '../controllers/viewTags';
import delTags from '../controllers/delTags';
import filterTags from '../controllers/filterTags';
import filterAdmin from '../controllers/filterAdmins';
import details from '../controllers/saveDes';
import getAudio from '../controllers/getAudio';
import GridFsStorage from 'multer-gridfs-storage';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';










import auth from '../middleware/auth';

import adminAuth from '../middleware/adminAuth';


const router = express.Router();
const mongoURI = "mongodb://teejohn247:Wisdom123.@cluster0-shard-00-00.f53iq.mongodb.net:27017,cluster0-shard-00-01.f53iq.mongodb.net:27017,cluster0-shard-00-02.f53iq.mongodb.net:27017/audio?ssl=true&replicaSet=atlas-tu9bmp-shard-0&authSource=admin&retryWrites=true&w=majority"

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
router.patch('/super_admin/change_password', auth, changePassword);
router.patch('/admin/update_admin', auth, updateAdmin);
router.get('/admin/view/:id', auth, viewSingleAdmin);
router.delete('/admin/delete/:id', [auth, adminAuth], deleteAdmin);
router.post('/admin/create_tags', [auth, adminAuth], create_tags);
router.patch('/admin/update_tags/:_id', [auth, adminAuth], tags);
router.get('/admin/view_tags/:page/:limit', [auth, adminAuth], viewTags);
router.get('/admin/view_admin/:page/:limit', [auth, adminAuth], viewAdmin);
router.get('/admin/filter_tags', [auth, adminAuth], filterTags);
router.get('/admin/filter_admin', [auth, adminAuth], filterAdmin);
router.delete('/admin/delete_tag/:id', [auth, adminAuth], delTags);
router.get('/file/:filename', getAudio);







export default router;