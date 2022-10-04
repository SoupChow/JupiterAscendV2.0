const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');
const Excel = require('exceljs');
const wb = new Excel.Workbook();
const wb1 = new Excel.Workbook();

const app = express();

// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

// file upload api
app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    const myFile1 = req.files.file1;
    console.log(myFile.name);
    console.log(myFile1.name);

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/certificates/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
    myFile1.mv(`${__dirname}/datasheets/${myFile1.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile1.name, path: `/${myFile1.name}`});
    });

})

app.listen(4500, () => {
    console.log('server is running at port 4500');
})