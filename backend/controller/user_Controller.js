import User from '../models/User.js';

export const registerUser = async(req,res)=>{
    try {
        const data = req.body;
        console.log(data);

        if(data.password != data.conPassword){
            return res.status(409).send({message:'Invalid Passwords'});
        }
        const user = await User({
            email: data.email,
            name: data.name,
            password: data.password
        });

        const savedUser = await user.save();
        console.log(savedUser);
        res.json(savedUser);
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(req,res)=>{
    try {
        const data = req.body;
        console.log(data);

        const user = await User.findOne({email: data.email, password: data.password}).lean();

        if(!user){
            return res.status(409).send({message: 'User does not exist'});
        }
        console.log(user);
        res.status(200).json({user})


    } catch (error) {
        console.log(error);
    }
}