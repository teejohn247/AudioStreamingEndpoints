import express from 'express';
import admin from '../controllers/superAdmin';
import adminLogin from '../controllers/superAdminLogin';
import changePassword from '../controllers/changePassword'

import auth from '../middleware/auth';

import adminAuth from '../middleware/adminAuth';


const router = express.Router();

router.post('/super_admin/signup', admin);
router.post('/super_admin/login', adminLogin);
router.patch('/super_admin/change_password', auth, changePassword);



export default router;