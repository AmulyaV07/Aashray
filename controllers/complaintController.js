const Complaint = require("../models/Complaint");
const User = require("../models/User");
const createComplaint = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            roomNumber
        } = req.body;


        // Determine department

        let department;


        if (category === "Plumbing") {

            department = "Plumbing";

        }
        else if (category === "Electrical") {

            department = "Electrical";

        }
        else if (category === "Cleaning") {

            department = "Cleaning";

        }
        else if (category === "Internet") {

            department = "Internet";

        }
        else if (category === "Furniture") {

            department = "Maintenance";

        }


        // Find workers in the department

        const workers = await User.find({
            role: "worker",
            department: department,
            isActive: true
    }).lean();


        let selectedWorker = null;


        // Find least-loaded worker

        if (workers.length > 0) {

            let lowestActiveTasks = Infinity;


            for (const worker of workers) {

                const activeTasks =
                    await Complaint.countDocuments({

                        assignedTo: worker._id,

                        status: {
                            $in: [
                                "Pending",
                                "In Progress"
                            ]
                        }

                    });


                if (activeTasks < lowestActiveTasks) {

                    lowestActiveTasks = activeTasks;

                    selectedWorker = worker;

                }

            }

        }


        // Create complaint

        await Complaint.create({

            title,

            description,

            category,

            roomNumber,

            user: req.user.id,

            assignedTo: selectedWorker
                ? selectedWorker._id
                : null,

            assignedAt: selectedWorker
                ? new Date()
                : null

        });


        res.redirect("/dashboard");


    } catch (error) {

        console.log(error);

        res.send(
            "Something went wrong while creating the complaint."
        );

    }

};
const getComplaintForm = (req, res) => {
    res.render("complaints/create");
};
const getMyComplaints = async (req, res) => {

    const complaints = await Complaint.find({
        user: req.user.id
    });

    res.render("complaints/myComplaints", {
        complaints
    });

};
const getComplaintById = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.user.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    res.render("complaints/details", {
        complaint
    });

};

const editComplaintPage = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.user.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    if (complaint.status !== "Pending") {
        return res.send("Only pending complaints can be edited.");
    }

    res.render("complaints/edit", {
        complaint
    });

};
const updateComplaint = async (req, res) => {

    const { title, description, category, roomNumber } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }
    if (complaint.user.toString() !== req.user.id) {
    return res.send("Unauthorized");
    }
    if (complaint.status !== "Pending") {
        return res.send("Only pending complaints can be edited.");
    }

    await Complaint.findByIdAndUpdate(req.params.id, {
        title,
        description,
        category,
        roomNumber
    });

    res.redirect("/complaints/my-complaints");

};

const deleteComplaint = async (req, res) => {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.send("Complaint not found");
    }

    if (complaint.user.toString() !== req.user.id) {
        return res.send("Unauthorized");
    }

    if (complaint.status !== "Pending") {
        return res.send("Only pending complaints can be cancelled.");
    }

    await Complaint.findByIdAndDelete(req.params.id);

    res.redirect("/complaints/my-complaints");
};
const startTask = async (req, res) => {

    try {

        const complaint = await Complaint.findById(
            req.params.id
        );


        if (!complaint) {

            return res.send("Complaint not found");

        }


        if (!complaint.assignedTo) {

            return res.send("No worker assigned");

        }


        if (
            complaint.assignedTo.toString() !==
            req.user.id
        ) {

            return res.send("Unauthorized");

        }


        if (complaint.status !== "Pending") {

            return res.send(
                "Task cannot be started."
            );

        }


        // Update status

        complaint.status = "In Progress";


        // Record start time

        complaint.startedAt = new Date();


        await complaint.save();


        res.redirect("/worker");


    } catch (error) {

        console.log(error);

        res.send(
            "Something went wrong while starting the task."
        );

    }

};


const completeTask = async (req, res) => {

    try {

        const complaint = await Complaint.findById(
            req.params.id
        );


        if (!complaint) {

            return res.send("Complaint not found");

        }


        if (!complaint.assignedTo) {

            return res.send("No worker assigned");

        }


        if (
            complaint.assignedTo.toString() !==
            req.user.id
        ) {

            return res.send("Unauthorized");

        }


        if (complaint.status !== "In Progress") {

            return res.send(
                "Task must be in progress first."
            );

        }


        // Update status

        complaint.status = "Resolved";


        // Record resolution time

        complaint.resolvedAt = new Date();


        await complaint.save();


        res.redirect("/worker");


    } catch (error) {

        console.log(error);

        res.send(
            "Something went wrong while completing the task."
        );

    }

};
module.exports = {
    getComplaintForm,
    createComplaint,
    getMyComplaints,
    getComplaintById,
    editComplaintPage,
    updateComplaint,
    deleteComplaint,
    startTask,
    completeTask
};