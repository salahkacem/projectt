const express = require ('express');
const router = express.Router();

const {getAllUsers, getAddUserView, UserAction , getUpdateUserView, updateUser,deleteUser} = require('../controllers/userController');

router.get('/admin/users' , getAllUsers);
router.get('/admin/addUser', getAddUserView);
router.post('/admin/addUserAction', UserAction);
router.get('/admin/updateUser/:id', getUpdateUserView)
router.post('/admin/updateUser/:id', updateUser);
router.get('/admin/deleteUser/:id', deleteUser);

module.exports = router