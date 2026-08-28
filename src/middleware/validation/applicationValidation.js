function validateApplication(req, res, next) {

    const { company, status } = req.body;

    const allowedStatuses = [
        "Applied",
        "Interview",
        "Rejected",
        "Offer"
    ];


    // POST
    if (req.method === "POST") {

        if (
            typeof company !== "string" ||
            !company.trim()
        ) {
            return res.status(400).json({
                message: "Company is required"
            });
        }

        if (
            typeof status !== "string" ||
            !status.trim()
        ) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }
    }


    // PATCH
    if (req.method === "PATCH") {

        if (company !== undefined) {

            if (
                typeof company !== "string" ||
                !company.trim()
            ) {
                return res.status(400).json({
                    message: "Company cannot be empty"
                });
            }
        }


        if (status !== undefined) {

            if (
                typeof status !== "string" ||
                !status.trim()
            ) {
                return res.status(400).json({
                    message: "Status cannot be empty"
                });
            }

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid application status"
                });
            }
        }
    }

    next();
}


module.exports = {
    validateApplication
};