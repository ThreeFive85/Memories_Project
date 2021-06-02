import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import secret from '../../jwtSecret.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "유저를 찾을 수 없습니다" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "잘못된 암호입니다" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h"});

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: '500 서버 에러'});
    }
}

export const signup = async (req, res) => {
    
}