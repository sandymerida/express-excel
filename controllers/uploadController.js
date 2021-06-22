const readXlsxFile = require("read-excel-file/node");

const profiles = new Array();
var fecha;

const upload = async (req, res) => {
    
    try {
        
        var banks, activos, pasivos, capitales = new Array();
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
                if(row[0]!=null){
                    if (row[0].includes("Información")){
                        fecha = case_date(row[0].substring(24,row[0].length))
                    }
                }
                if (row[0] === 'PERFIL FINANCIERO') {
                    banks = row                
                }
                if (row[0] === 'ACTIVO') {
                    activos = row
                }
                if (row[0] === 'PASIVO') {
                    pasivos = row
                }
                if (row[0] === 'CAPITAL CONTABLE') {
                    capitales = row
                }
            });
            
            insert_profile(banks,activos,'ACTIVO');
            insert_profile(banks,pasivos,'PASIVO');
            insert_profile(banks,capitales,'CAPITAL CONTABLE');
            

            console.log(profiles)
            
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

function case_date(date_string){
    const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
      var temp = date_string.split(" de ");
      months.forEach(element => {
          if (temp[1] == element){
            temp[1]=(months.indexOf(element)+1).toString();
          }
      });      
      
      return new Date(temp[2] + '-' + temp[1] + '-' + temp[0]);
}

function insert_profile(banks_array,feature_array,feature){
    for (let i = 1; i < banks_array.length; i++) {
        let profile = {
            date:fecha,
            amount:feature_array[i],
            bank:banks_array[i],
            feature:feature
        }
        profiles.push(profile)
    }
}

module.exports = {
    upload,
};