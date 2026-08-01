function validateApplication(req, res, next) {

    const {company, status} = req.body;

    if(!company || !company.trim()){
        return res.status(400).json({
            message:"Company is required"
        });
    }

    if(!status || !status.trim()){
        return res.status(400).json({
            message: "Status is required"
        });
    }

    next();
}

module.exports = {
    validateApplication
};