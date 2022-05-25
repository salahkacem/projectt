const {ObjectId} = require("mongodb");
const Hotel = require ('../models/hotel');



const getAllHotels = async (req,res,next) => {
const data = await Hotel.find({})
res.render('hotel/hotellist', {"hotels" : data});
}
const reservation = (req,res,next) => {
    res.render('reservation');
}

const getAddHotelView = (req,res,next) => {
    res.render('hotel/addHotel');
}

const HotelAction = (req,res,next) => {
    // begin traitement

    var newHotel = new Hotel();
    newHotel.name   = req.body.name;
    newHotel.description    = req.body.description;
    newHotel.rate    = req.body.rate;
    newHotel.place = req.body.place;
    newHotel.price = req.body.price;
    newHotel.image = req.body.image;


    newHotel.save(function(err) {
        if (err)
            throw err;
        res.redirect('/admin/hotels');
    });
}



const getUpdateHotelView= async (req,res, next)=> {
            const id=req.params.id
            const data = await Hotel.findById(ObjectId(id))
            res.render('hotel/updateHotel', {"hotel" : data});
    }


const updateHotel = async(req,res,next) => {
    const id =req.params.id;
    const data = req.body;
    const filter ={_id: new ObjectId(id)}
    let doc = await Hotel.findOneAndUpdate(filter, data);
    if(doc){
        res.redirect('/admin/hotels');
    }else{
        res.status(404).send('Hotel with given id not found');
    }
}


const deleteHotel = async (req,res,next) => {

 
            const id =req.params.id;
        const doc=await   Hotel.findByIdAndDelete(new ObjectId(id) )
        if(doc){
            res.redirect('/admin/hotels');
        }else{
            res.status(404).send('Hotel with given id not found');
        }

  }


module.exports= {
    reservation,
    getAllHotels,
    getAddHotelView,
    HotelAction,
    getUpdateHotelView,
    updateHotel,
    deleteHotel,


}