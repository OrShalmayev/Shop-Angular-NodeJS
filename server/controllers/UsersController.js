const User = require('../models/User');
class UsersController {

    /**
     *@POST 
     */
    store(req, res, next){
        let user = new User(req.body);
        user.save(err=>{
            if(err) res.send(err);
        });
        req.session.user = {
            email: user.email,
            password: user.password,
            role: user.role
        }
        req.session.save(err => {
            if(err) console.error(new Error(err));
            
        });
        console.log('user',user);
        console.log('session',req.session);
    }

    async emailExists(req, res, next){
        try {
            let email = await User.findOne({email:req.params.email});
            console.log(email)
            if(email){
                res.send({message:'Email is already taken.', valid:false})
            }else{
                res.send({message:'Email is ok.', valid:true})
            }
        } catch (error) {
            console.error(error);
        }

    }

}

module.exports = new UsersController;