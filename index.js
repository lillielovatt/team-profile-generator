const fs = require("fs");
const generateHTML = require("./generateHTML");
const promptManagerAdd=require("./lib/promptManagerAdd");
const promptEmployeeAdd=require("./lib/promptEmployeeAdd");

// function to write HTML file
function writeFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}.HTML`, data, err => {
        if (err) {
            console.log("There was an error.", err);
        } else {
            console.log("Check out your new HTML file!");
        }
    })
}

promptManagerAdd()
    .then(promptEmployeeAdd)
    .then(allEmployeeData => {
        return generateHTML(allEmployeeData);
    })
    .then(employeeHTML => {
        return writeFile("team-profile", employeeHTML);
    })
    .catch(err => {
        console.log(err);
    });