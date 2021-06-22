const express = require("express");
const app = express();
const initRoutes = require("./routes");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});