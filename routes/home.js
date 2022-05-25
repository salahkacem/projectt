const express = require ('express');
const router = express.Router();

const {homePage , login, loginAction, signup,signupAction,reservationHotelAction,reservationVolAction,getResultVols, getUserHotelreservation, getUservolreservation,logout,cancelReservationHotelAction,cancelReservationVolAction} = require('../controllers/homeController');
module.exports = router

router.get('/', homePage);
router.get('/login' , login);
router.post('/loginAction' , loginAction);
router.get('/signup',signup);
router.post('/signupAction',signupAction);
router.get('/logout',logout);
router.get('/reservationHotelAction/:id',reservationHotelAction)
router.get('/CancelReservationVolAction/:id',cancelReservationVolAction)
router.get('/CancelReservationHotelAction/:id',cancelReservationHotelAction)
router.get('/reservationVolAction/:id',reservationVolAction)
router.get('/reservationVol',getUservolreservation)
router.get('/reservationHotel',getUserHotelreservation)
router.post('/resultVols',getResultVols)
