const express = require ('express');
const router = express.Router();

const {getAllHotels, getAddHotelView, HotelAction , getUpdateHotelView, updateHotel,deleteHotel,reservation} = require('../controllers/hotelController');

router.get( '/admin/hotels', getAllHotels);
router.get('/reservation', reservation);
router.get('/admin/addHotel', getAddHotelView);
router.post('/admin/addHotelAction', HotelAction);
router.get('/admin/updateHotel/:id', getUpdateHotelView)
router.post('/admin/updateHotelAction/:id', updateHotel);
router.get('/admin/deleteHotel/:id', deleteHotel);

module.exports = router