const User = require("../models/User");
const bcrypt = require("bcrypt");

const loginPage = (req, res) => {
    res.render("auth/login");
};

const registerPage = (req, res) => {
    res.render("auth/register");
};

const registerUser = async (req, res) => {
    try {

        const { name, email, password, roomNumber } = req.body;

        if (!name || !email || !password || !roomNumber) {
            return res.send("All fields are required");
        }

        if (password.length < 6) {
            return res.send("Password must be at least 6 characters");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            roomNumber
        });

        await user.save();

        res.redirect("/auth/login");

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");

    }
};
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Invalid Password");
        }

        res.send("Login Successful");

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");

    }

};

module.exports = {
    loginPage,
    registerPage,
    registerUser,
    loginUser
};
