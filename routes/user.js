import express from 'express';
import admin from '../controllers/admin';
import auth from '../middleware/auth';

import adminAuth from '../middleware/adminAuth';


const router = express.Router();

router.post('/admin/signup', admin);




// router.get('/view/all',[auth, adminAuth], adminView);



export default router;