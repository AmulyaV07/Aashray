const getWorkerDashboard = (req, res) => {

    res.render("worker/dashboard", {
        user: req.user
    });

};

module.exports = {
    getWorkerDashboard
};