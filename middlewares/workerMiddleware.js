const verifyWorker = (req, res, next) => {

    if (req.user.role !== "worker") {
        return res.send("Access Denied");
    }

    next();

};

module.exports = verifyWorker;