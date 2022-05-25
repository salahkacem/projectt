const {ObjectId} = require("mongodb");
const Vol = require ('../models/vol');



const getAllvols = async (req,res,next) => {
const data = await Vol.find({})
res.render('vol/vollist', {"vols" : data});
}

const getAddVolView = (req,res,next) => {
    res.render('vol/addVol');
}

const getVolReservationView = (req,res,next) => {
    res.render('vol/volreservation');
}

const VolAction = (req,res,next) => {
    var newVol = new Vol();
    newVol.startPlace    = req.body.startPlace;
    newVol.distination   = req.body.distination;
    newVol.StartDate    = req.body.StartDate;
    newVol.price    = req.body.price;
    newVol.returnVol    = req.body.returnVol=="on"?true:false;
    newVol.save(function(err) {
        if (err)
            throw err;
        res.redirect('/admin/vols');
    });
}



const getUpdateVolView= async (req,res, next)=> {
            const id=req.params.id
            const data = await Vol.findById(ObjectId(id))
            res.render('vol/updateVol', {"vol" : data});
}


const updateVol = async(req,res,next) => {
    const id =req.params.id;
    const data = req.body;
    const filter ={_id: new ObjectId(id)}
    data.returnVol    = data.returnVol=="on"?true:false;
    let doc = await Vol.findOneAndUpdate(filter, data);
    if(doc){
        res.redirect('/admin/vols');
    }else{
        res.status(404).send('Vol with given id not found');
    }
}


const deleteVol = async (req,res,next) => {

 
            const id =req.params.id;
        const doc=await   Vol.findByIdAndDelete(new ObjectId(id) )
        if(doc){
            res.redirect('/admin/vols');
        }else{
            res.status(404).send('Vol with given id not found');
        }

  }


module.exports= {
    getAddVolView,
    getAllvols,
    getVolReservationView,
    VolAction,
    getUpdateVolView,
    updateVol,
    deleteVol
}