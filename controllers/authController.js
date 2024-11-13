const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
    const { name, email, username, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, username, password: hashPassword });
        res.status(201).json({ message: "User created super successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });   
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};