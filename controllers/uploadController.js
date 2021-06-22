const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file");
        }

        let path =
            __basedir + "/tmp-uploads/" + req.file.filename;

        readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();

            let exampleArray = [];

            rows.forEach((row) => {
                if (row[0] === 'PERFIL FINANCIERO') {
                    // then bank names has been found and must be stored temporarily to join financial data
                    console.log(row);
                }
                if (row[0] === 'ACTIVO') {
                    // then characteristic has been found and must be stored temporarily to join financial data
                    console.log(row);
                }
                // example of how this can be done using objects and arrays
                let example = {
                    id: row[0],
                    value1: row[1],
                    value2: row[2],
                    value3: row[3],
                };
                // console.log(example); commented to get a cleaner console but can be used to test
                exampleArray.push(example);
            });
            //console.log(exampleArray);
            res.status(200).send({
                message: "File uploaded successfully"
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};


module.exports = {
    upload,
};