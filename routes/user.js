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










import auth from '../middleware/auth';

import adminAuth from '../middleware/adminAuth';


const router = express.Router();

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






export default router;