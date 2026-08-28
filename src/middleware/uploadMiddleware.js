const multer = require("multer");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/");

    },

    filename: function (req, file, cb) {

        const filename =
            Date.now() +
            "-" +
            file.originalname;

        cb(null, filename);

    }

});


const upload = multer({

    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {

        if (file.mimetype === "application/pdf") {

            cb(null, true);

        } else {

            cb(
                new Error("Only PDF files are allowed.")
            );

        }

    }

});


module.exports = upload;