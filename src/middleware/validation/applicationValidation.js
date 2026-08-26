function validateApplication(req, res, next) {

    const { company, status } = req.body;

    // POST → required fields
    if (req.method === "POST") {

        if (!company || !company.trim()) {
            return res.status(400).json({
                message: "Company is required"
            });
        }

        if (!status || !status.trim()) {
            return res.status(400).json({
                message: "Status is required"
            });
        }
    }

    // PATCH → validate only fields that are provided
    if (req.method === "PATCH") {

        if (
            company !== undefined &&
            (!company || !company.trim())
        ) {
            return res.status(400).json({
                message: "Company cannot be empty"
            });
        }

        if (
            status !== undefined &&
            (!status || !status.trim())
        ) {
            return res.status(400).json({
                message: "Status cannot be empty"
            });
        }
    }

    next();
}

module.exports = {
    validateApplication
};