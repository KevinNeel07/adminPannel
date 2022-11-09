import User from '../models/User.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async(req,res)=>{
    try {
        const data = req.body;
        console.log(data);

        const user = await User.findOne({email: data.email}).lean();

        if(user){
            return res.status(409).send({message: 'User Exist!'});
        }
        if(data.password != data.conPassword){
            return res.status(409).send({message:'Password Match Unsuccessful'});
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await User({
            email: data.email,
            name: data.name,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        const token = jwt.sign({email: savedUser.email, id: savedUser.id, name: savedUser.name}, 'thisissecret')
        console.log(token);
        res.json({result: savedUser, token});
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(req,res)=>{
    try {
        const data = req.body;
        console.log(data);

        const user = await User.findOne({email: data.email}).lean();

        if(!user){
            return res.status(409).send({message: 'User does not exist'});
        }
        
        const comparePassword = await bcrypt.compare(data.password, user.password);
        if(!comparePassword){
            return res.status(409).send({message:"Invalid Credentials!"});
        }else{
            const token = jwt.sign({email: user.email, id: user.id, user: user.name}, 'thisissecret')
            res.status(200).json({result:user,token})
        }
    } catch (error) {
        console.log(error);
    }
} 