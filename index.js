const axios = require("axios");
const csv = require("csvtojson");

function csvtojson(url, type) {

    const csvFilePath = `${url}` //file path of csv
    csv({
        delimiter: ';',
        ignoreEmpty: true
    })
        .fromFile(csvFilePath)
        .then(async (jsonObj) => {
            try {
                const response = await axios.post('http://localhost:8000/api/datainsert',
                    {
                        Headers: {
                            "Content-Type": "application/json"
                        },
                            type: type,
                            dbdata: jsonObj
                    }
                );
                const verostore = response.data.response.message;
                console.log(verostore);
            } catch (error) {
                console.log(error);
            }
        })
}
// csvtojson(url = "/home/anderson/Documentos/Automagico/automagico_assoc.csv", "assoc");
csvtojson(url = "/home/anderson/Documentos/Automagico/automagico_meta.csv", "meta");
// csvtojson(url = "/home/anderson/Documentos/Automagico/automagico_venda.csv", "venda");