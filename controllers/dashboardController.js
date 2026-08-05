const dashboard = (req, res) => {

    res.send(`Welcome User ${req.user.id}`);

};

module.exports = {
    dashboard
};