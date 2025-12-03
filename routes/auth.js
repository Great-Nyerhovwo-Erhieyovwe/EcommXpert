import express, { response } from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import qs from 'querystring';
import { error } from 'console';
import { redirect } from 'react-router-dom';
import { access } from 'fs';

const router = express.Router();


// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
});

// GOOGLE OAuth
// step1: Redirect user to google login page
router.get('/auth/google', (req, res) => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "openid",
            "profile",
            "email"
        ].join(" "),
    };

    const qs = new URLSearchParams(options);
    res.redirect(`${rootUrl}?${qs.toString()}`);
});

// step 2: Google redirects back to your backend with "code"
router.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code;

    try {
        // Exchange Google code for access token
        const tokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            qs.stringify({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URL,
                grant_type: "authorization_code",
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { id_token, access_token } = tokenResponse.data;
        
        // fetch google user data
        const googleUser = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            { headers: { Authorization: `Bearer ${id_token}` } }
        );

        const { email, given_name, family_name } = googleUser.data;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create user automatically
            user = new User({
                email,
                firstName: given_name,
                lastName: family_name,
                password: '', // google users don't have a password
                goal: "learn",
                balance: 0,
                total_earnings: 0,
                xp: 0,
                streak: 0,
                badges: ["onboarding"],
                role: "user",
                onboarding_completed: false,
            });

            await user.save();
        }

        // Generate your login JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Redirect back to React app
        res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
    } catch (error) {
        console.error('Google OAuth Error:', error);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=Google Login Failed`);
    }
});


// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if user already exists
        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const newUser = new User({
            email,
            password,
            firstName,
            lastName,
            goal: "learn",
            balance: 0,
            total_earnings: 0,
            xp: 0,
            streak: 0,
            badges: ["Onboarding"],
            role: "user", // default role
            onboarding_completed: false // default
        });

        // Save the new user to mongoDB
        await newUser.save();

        res.json({
            message: "Signup successful",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email" });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        res.json({
            message: "Login successful",
            user
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// AuthMiddlewares
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Secure data", user: req.user });
});

export default router;