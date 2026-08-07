const User = require("../models/User");

const getProfile = async (req, res) => {

    const user = await User.findById(req.user.id);

    res.render("profile", {
        user
    });

};

module.exports = {
    getProfile
};