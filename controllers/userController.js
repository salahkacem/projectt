const {ObjectId} = require("mongodb");
const User = require ('../models/user');
var bcrypt   = require('bcrypt-nodejs');



const getAllUsers = async (req,res,next) => {
const data = await User.find({})
res.render('user/userlist', {"customers" : data});
}


const getAddUserView = (req,res,next) => {
    res.render('user/addUser');
}

const UserAction = (req,res,next) => {
    // begin traitement

    var newUser = new User();
    newUser.firstname    = req.body.firstname;
    newUser.password    = req.body.password;
    newUser.lastname    = req.body.lastname;
    newUser.phonenumber    = req.body.phonenumber;
    newUser.email = req.body.email;
    newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    newUser.role = req.body.role;

    newUser.save(function(err) {
        if (err)
            throw err;
        res.redirect('/admin/users');
    });

  //end
    //end traitement
}



const getUpdateUserView= async (req,res, next)=> {
            const id=req.params.id
            const data = await User.findById(ObjectId(id))
            res.render('user/updateUser', {"customer" : data});
    }


const updateUser = async(req,res,next) => {
    /*const {error}= validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);*/
    const id =req.params.id;
    const data = req.body;
    const filter ={_id: new ObjectId(id)}

    let doc = await User.findOneAndUpdate(filter, data);
    if(doc){
        res.redirect('/admin/users');
    }else{
        res.status(404).send('Customer with given id not found');
    }
}


const deleteUser = async (req,res,next) => {

 
            const id =req.params.id;
        const doc=await    User.findByIdAndDelete(new ObjectId(id) )
        if(doc){
            res.redirect('/admin/users');
        }else{
            res.status(404).send('Customer with given id not found');
        }

  }


module.exports= {
    getAllUsers,
    getAddUserView,
    UserAction,
    getUpdateUserView,
    updateUser,
    deleteUser
}