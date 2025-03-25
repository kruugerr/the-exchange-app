const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
    try {
        // store information in variables
        const { first_name, last_name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash password and create user
        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({ first_name, last_name, email, password_hash });

        // Generate a JWT token
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Send token in response
        res.status(201).json({
            message: 'User registered successfully',
            token,  
            user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async(req, res) => {
    try{
        // store information in variables
        const {email, password} = req.body;

        // search for user in DB
        const user = await User.findOne({where: { email } });

        // If no user exists...
        if (!user || !(await bcrypt.compare(password, user.password_hash))){
            return res.status(401).json({error: 'Invalid Credentials'});
        }

        // otherwise, return token
        const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch(error){
        res.status(500).json({ error: error.message })
    }
};