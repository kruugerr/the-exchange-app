const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async(req, res) => {
    try {
        const {first_name, last_name, email, password, is_host} = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({first_name, last_name, email, password_hash, is_host});
        res.status(201).json({message: 'User registered successfully', user});

    }catch(error){
        res.status(500).json({error:error.message});
    }
};

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password_hash))){
            return res.status(401).json({error: 'Invalid Credentials'});
        }
        const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch(error){
        res.status(500).json({ error: error.message })
    }
};