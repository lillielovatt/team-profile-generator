const Manager = require("./Manager");
const inquirer = require("inquirer");

const promptManagerAdd = () => {
    return inquirer.prompt([ 
        {
            type: "input",
            name: "name",
            message: "What's your manager's name? (Required)",
            validate: name => {
                if (typeof name === "string") {
                    return true;
                } else {
                    console.log("You need to enter a valid name.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What's your manager's employee ID? (Required)",
            validate: id => {
                if (!isNaN(id) && id) {
                    return true;
                } else {
                    console.log("You need to enter a valid employee ID.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What's your manager's email address? (Required)",
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log("You need to enter a valid email.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What's your manager's office number? (Required)",
            validate: officeNumber => {
                if (!isNaN(officeNumber) && officeNumber) {
                    return true;
                } else {
                    console.log("You need to enter a valid office number.");
                    return false;
                }
            }
        } //after the prompt, create a new instance of Manager with the data collected from the user input
    ]).then(managerData => {
        const { name, email, id, officeNumber } = managerData; //can be out of order, cuz the name is the same
        const manager = new Manager(name, email, id, officeNumber); //CANNOT BE OUT OF ORDER
        //final return for the Promise--an array with a single Manager object inside
        return [manager];
    })
};

module.exports=promptManagerAdd;