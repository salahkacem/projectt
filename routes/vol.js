const express = require ('express');
const router = express.Router();

const {getAllvols, getAddVolView, VolAction , getUpdateVolView, updateVol,deleteVol,getVolReservationView} = require('../controllers/volController');

router.get('/admin/vols' , getAllvols);
router.get('/admin/addVol', getAddVolView);
router.get('/volReservation', getVolReservationView);
router.post('/admin/addVolAction', VolAction);
router.get('/admin/updateVol/:id', getUpdateVolView)
router.post('/admin/updateVolAction/:id', updateVol);
router.get('/admin/deleteVol/:id', deleteVol);

module.exports = router