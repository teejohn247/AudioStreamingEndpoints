import express from 'express';
import superAdmin from '../controllers/superAdmin';
import superAdminLogin from '../controllers/superAdminLogin';
import changePassword from '../controllers/changePassword';
import admin from '../controllers/admin';
import adminLogin from '../controllers/adminLogin';
import updateAdmin from '../controllers/updateUser';

import auth from '../middleware/auth';

import adminAuth from '../middleware/adminAuth';


const router = express.Router();

router.post('/super_admin/signup', superAdmin);
router.post('/super_admin/login', superAdminLogin);
router.post('/admin/signup', [auth, adminAuth], admin);
router.post('/admin/login', adminLogin);
router.patch('/super_admin/change_password', auth, changePassword);
router.patch('/admin/update_admin', auth, updateAdmin);



export default router;