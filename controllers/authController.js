const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const user = new User({
            name: "Amulya",
            email: "amulya@gmail.com",
            password: "123456",
            roomNumber: "A-203"
        });

        await user.save();

        res.send("User Registered Successfully");
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
};

module.exports = {
    registerUser
};