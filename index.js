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
                const response = await axios.post('http://automagico.megb.com.br/api/uploaddata',
                // const response = await axios.post('http://localhost:8000/api/uploaddata',
                    {
                        Headers: {
                            "Content-Type": "application/json"
                        },
                            type: type,
                            jdata: jsonObj
                    }
                );
                const verostore = response.data;
                console.log(verostore);
            } catch (error) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        })
}

csvtojson(url = "./automagico_vendas.csv", "venda");
csvtojson(url = "./automagico_assoc.csv", "assoc");
csvtojson(url = "./automagico_total.csv", "total");