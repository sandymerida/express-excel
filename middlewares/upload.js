const multer = require("multer");

const excelFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")
    ) {
        cb(null, true);
    } else {
        cb("Please upload only excel file.", false);
    }
};

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir  + "/tmp-uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-temp-${file.originalname}`);
    },
});

const uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;