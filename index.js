const inquirer = require("inquirer");
const fs = require("fs");
const generateHTML = require("./generateHTML");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const teamArray = [];

//need to prompt user
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
        } //after the prompt, create a new instance of Manager, put that in the array 
    ]).then(managerData => {
        const { name, email, id, officeNumber } = managerData; //can be out of order, cuz the name is the same
        const manager = new Manager(name, email, id, officeNumber); //CANNOT BE OUT OF ORDER
        // teamArray.push(manager);
        return [manager];
    })
};

const promptEmployeeAdd = employeeDataArr => {
    return inquirer.prompt([
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add an Engineer, add an Intern, or finish building your team?",
            choices: ["Engineer", "Intern", "Finished!"],
            default: "Finished!"
        },
        {
            type: "input",
            name: "name",
            message: "Please enter employee's name. (Required)",
            when: (answers) => answers.addEmployee != 'Finished!',
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
            name: "email",
            message: "Please enter employee's email. (Required)",
            when: (answers) => answers.addEmployee != 'Finished!',
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
            name: "id",
            message: "Please enter employee's ID. (Required)",
            when: (answers) => answers.addEmployee != 'Finished!',
            validate: id => {
                if (!isNaN(id) && id) {
                    return true;
                } else {
                    console.log("You need to enter a valid ID.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Please enter employee's GitHub username. (Required)",
            when: (answers) => answers.addEmployee === 'Engineer',
            validate: github => {
                if (github) {
                    return true;
                } else {
                    console.log("You need to enter a valid GitHub.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "Please enter employee's school. (Required)",
            when: (answers) => answers.addEmployee === 'Intern',
            validate: school => {
                if (typeof school === "string") {
                    return true;
                } else {
                    console.log("You need to enter a valid school.");
                    return false;
                }
            }
        }
    ]).then(employeeAddData => {
        // checks if user asked to Finish, in which case return is invoked
        // or else returns the callback function call to return to the beginning of this function, and ask question again to add more or finish
        const arr = employeeDataArr;
        if (employeeAddData.addEmployee === "Finished!") {
            return arr; //need this for promise chain
        } else if (employeeAddData.addEmployee === "Intern") {
            const { name, email, id, school } = employeeAddData;
            const intern = new Intern(name, email, id, school);
            arr.push(intern);
            return promptEmployeeAdd(arr); //run function again
        } else if (employeeAddData.addEmployee === "Engineer") {
            const { name, email, id, github } = employeeAddData;
            const engineer = new Engineer(name, email, id, github);
            arr.push(engineer);
            return promptEmployeeAdd(arr); //run function again
        }
    });
};

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

// //want the below to work, need to return inquirer.prompt
promptManagerAdd()
    .then(promptEmployeeAdd)
    .then(allEmployeeData => {
        console.log(allEmployeeData);
        return generateHTML(allEmployeeData);
    })
    .then(employeeHTML => {
        return writeFile("team-profile", employeeHTML);
    })
    .catch(err => {
        console.log(err);
    });
    // async function cLog(){
    //    let pm =  await promptManagerAdd();
    //    console.log(pm);
    // }
    // cLog();