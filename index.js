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
                if (name) {
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
                if (id) {
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
                if (officeNumber) {
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
        teamArray.push(manager);
        console.log(teamArray);
            console.log(teamArray[0].constructor);
            console.log(teamArray[0].name);
            console.log(teamArray[0].getRole());
    })
};

const promptEmployeeAdd = employeeAddQuestion => {
    return inquirer.prompt([
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add an Engineer, add an Intern, or finish building your team?",
            choices: ["Engineer", "Intern", "Finished!"] //validate TODO, or have a default
        },
        {
            type: "input",
            name: "name",
            message: "Please enter employee's name. (Required)",
            when: (answers) => answers.addEmployee != 'Finished!',
            validate: name => {
                if (name) {
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
                if (id) {
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
                if (school) {
                    return true;
                } else {
                    console.log("You need to enter a valid school.");
                    return false;
                }
            }
        }
    ]).then(employeeAddData => {
        if (employeeAddData.addEmployee === "Finished!") {
            return employeeAddData; //need this for promise chain
        } else if (employeeAddData.addEmployee === "Intern") {
            const { name, email, id, school } = employeeAddData;
            const intern = new Intern(name, email, id, school);
            teamArray.push(intern);
            console.log(teamArray);
            return promptEmployeeAdd(employeeAddData); //run function again
        } else if (employeeAddData.addEmployee === "Engineer") {
            const { name, email, id, github } = employeeAddData;
            const engineer = new Engineer(name, email, id, github);
            teamArray.push(engineer);
            console.log(teamArray);
            console.log(teamArray[0].constructor);
            console.log(teamArray[0].name);
            console.log(teamArray[0].getRole());
            return promptEmployeeAdd(employeeAddData); //run function again
        }
    });
};

// function to write HTML file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}.HTML`, data, err => {
        if (err) {
            console.log("There was an error.");
            console.log(err);
        } else {
            console.log("Check out your new HTML file!");
        }
    })
}

// //want the below to work, need to return inquirer.prompt
promptManagerAdd()
    .then(promptEmployeeAdd)
    .then(allEmployeeData => {
        return generateHTML(teamArray);
    })
    .then(employeeHTML => {
        return writeFile("team-profile",employeeHTML);
    })
    .catch(err => {
        console.log(err);
    });











    
// NEW PROMPT FUNCTION
// engineer/intern? - employeeType is the name property, name, ID, => 
//  when: (answers) => answers.employeeType === 'Engineer'
//  when: (answers) => answers.employeeType === 'Intern'

// intern(university), engineer(github)


// const promptEmployeeAddQuestion = employeeData => {
//     //start with the question of "ADD ENGINEER OR INTERN, or finished?"
//     return inquirer.prompt([
//         {
//             type: "list",
//             name: "addEmployee",
//             message: "Would you like to add an Engineer, add an Intern, or finish building your team?",
//             choices: ["Engineer", "Intern", "Finished!"] //validate TODO, or have a default
//         }
//     ])
//     // .then(addEmployeeQuestion => {
//     //     if (addEmployeeQuestion.addEmployee === "Finished!"){
//     //         process.exit(0); //done
//     //     } else{
//     //         // promptEmployeeAdd();
//     //         // want this to be called in a promise
//     //     }
//     // })
// };
//I want to create a promise chain, INSTEAD OF calling functions one after the other

