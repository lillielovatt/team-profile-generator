const inquirer = require("inquirer");
const fs = require("fs");
const generateHTML=require("./generateHTML");

//need to prompt user
const promptManagerAdd = () => {
    return inquirer.prompt([
        {
            type:"input",
            name:"managerName",
            message:"What's your manager's name? (Required)",
            validate: managerNameInput => {
                if (managerNameInput) {
                    return true;
                } else {
                    console.log("You need to enter a valid name.");
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"managerId",
            message:"What's your manager's employee ID? (Required)",
            validate: managerIdInput => {
                if (managerIdInput) {
                    return true;
                } else {
                    console.log("You need to enter a valid employee ID.");
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"managerEmail",
            message:"What's your manager's email address? (Required)",
            validate: managerEmailInput => {
                if (managerEmailInput) {
                    return true;
                } else {
                    console.log("You need to enter a valid email.");
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"managerOfficeNumber",
            message:"What's your manager's office number? (Required)",
            validate: managerOfficeNumberInput => {
                if (managerOfficeNumberInput) {
                    return true;
                } else {
                    console.log("You need to enter a valid office number.");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add an Engineer, add an Intern, or finish building your team?",
            choices: ["Add an Engineer", "Add an Intern", "Finished!"]
        }
    ]).then(employeeData => {
        if (employeeData.addEmployee === "Finished!") {
            return employeeData;
        } elseif(employeeData.addEmployee === "Add an Engineer"){
            //run inquirer prompt for that
        } elseif(employeeData.addEmployee === "Add an Intern"){
            //run inquirer prompt for that
        }
    })
};

const promptEmployeeAdd = employeeData => {

};

promptManagerAdd()
    .then(promptEmployeeAdd)
    .then(allEmployeeData => {
        return generateHTML(allEmployeeData);
    })
    .then(employeeHTML => {
        return writeFile(employeeHTML);
    })
    .catch(err => {
        console.log(err);
    });
