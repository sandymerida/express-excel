const express = require("express");
const router = express.Router();
const excelController = require("./controllers/uploadController");
const upload = require("./middlewares/upload");

let routes = (app) => {
    router.post("/upload", upload.single("file"), excelController.upload);
    app.use("/api", router);
};

module.exports = routes;