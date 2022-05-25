const User = require ('../models/user');
const Hotel = require ('../models/hotel');
const Vol = require ('../models/vol');
const Reservationhotel = require ('../models/reservationhotel');
const Reservationvol = require ('../models/reservationvol');
var bcrypt   = require('bcrypt-nodejs');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const homePage = async(req,res,next) => {
    const datauser= await localStorage.getItem("user")
    const hotels = await Hotel.find({})
    const user=JSON.parse(datauser)
    if(!user || user.role=="user"){
        res.render('home',{"user":user,"hotels":hotels});
    }else {
        res.redirect("/admin/users")
    }
}

const login= async (req,res, next)=> {
    res.render('login')
}

const logout= async (req,res, next)=> {
    localStorage.clear()
    res.redirect('/');

}

const loginAction= async (req,res, next)=> {
    const body=req.body
    const password = body.password
    const filter = {email :body.email}
    await User.findOne(filter, function (err, user) {
        if (err){
            res.redirect('/login');
        }
        if (!user){
            res.redirect('/login');
        }
        if (!user.validPassword(password)){
            res.redirect('/login');
        }
        user.is_logged=true
        // bsh thotou fl localstorge
        localStorage.setItem("user",JSON.stringify(user))
        res.redirect('/');
     })
}

const signupAction= async (req,res, next)=> {
    var newUser = new User();
    newUser.firstname    = req.body.firstname;
    newUser.password    = req.body.password;
    newUser.lastname    = req.body.lastname;
    newUser.phonenumber    = req.body.phonenumber;
    newUser.email = req.body.email;
    newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    newUser.role = "user";

    newUser.save(function(err) {
        if (err)
            throw err;
        res.redirect('/login');
    });

}

const signup= async (req,res, next)=> {
    res.render('signup')
}

const reservationHotelAction= async (req,res, next)=> {
    const id=req.params.id
    const datauser= await localStorage.getItem("user")
    const user=JSON.parse(datauser)
    var reservationhotel = new Reservationhotel();
    reservationhotel.user=user._id
    reservationhotel.hotel=id
    reservationhotel.save(function(err) {
        if (err)
            throw err;
        res.redirect('/');
    });
}

const reservationVolAction= async (req,res, next)=> {
    const id=req.params.id
    const datauser= await localStorage.getItem("user")
    const user=JSON.parse(datauser)
    var reservationvol = new Reservationvol();
    reservationvol.user=user._id
    reservationvol.vol=id
    reservationvol.save(function(err) {
        if (err)
            throw err;
        res.redirect('/');
    });
}

const getResultVols= async (req,res, next)=> {
    let filter={}
    if (req.body.startPlace!="") {
        filter.startPlace=req.body.startPlace
    }
    if (req.body.distination!="") {
        filter.distination=req.body.distination
    }
    if (req.body.date!="") {
        filter.date=req.body.date
    }
    if (req.body.returnVol=="return") {
        filter.returnVol=true
    }else if(req.body.returnVol=="go"){
        filter.returnVol=false
    }
    const data = await Vol.find(filter)
    const datauser= await localStorage.getItem("user")
    const user=JSON.parse(datauser)
    res.render('vol/resultVols',{"vols":data,"user":user})
}

const getUserHotelreservation= async (req,res, next)=> {

    const datauser= await localStorage.getItem("user")
    const user=JSON.parse(datauser)
    const reservation= await Reservationhotel.find({user:user._id}).populate(['hotel','user'])
    res.render('hotel/userHotelreservation',{"user":user,"reservation":reservation})

}

const getUservolreservation= async (req,res, next)=> {
    const datauser= await localStorage.getItem("user")
    const user=JSON.parse(datauser)
    const reservation= await Reservationvol.find({user:user._id}).populate(['vol','user'])
    res.render('vol/userVolreservation',{"user":user,"reservation":reservation})
}
const cancelReservationVolAction =async (req,res, next)=> {
    const id =req.params.id;
    const doc=await    Reservationvol.findByIdAndDelete(id)
    if(doc){
        res.redirect('/reservationVol');
    }else{
        res.status(404).send('Customer with given id not found');
    }

}
const cancelReservationHotelAction =async (req,res, next)=> {
    const id =req.params.id;
    const doc=await    Reservationhotel.findByIdAndDelete(id)
    if(doc){
        res.redirect('/reservationHotel');
    }else{
        res.status(404).send('Customer with given id not found');
    }
}

module.exports= {
    homePage,
    reservationVolAction,
    reservationHotelAction,
    cancelReservationVolAction,
    cancelReservationHotelAction,
    getResultVols,
    getUservolreservation,
    getUserHotelreservation,
    login,
    loginAction,
    signup,
    signupAction,
    logout,
}