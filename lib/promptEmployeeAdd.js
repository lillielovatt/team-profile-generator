const Intern = require("./Intern");
const Engineer = require("./Engineer");
const inquirer = require("inquirer");

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
        //where employeeAddData is the single question data, with either engineer/intern data OR finished request
        // checks if user asked to Finish, in which case return is invoked
        // or else return to the beginning of this same function, and ask question again to add more employees or finish
        const arr = employeeDataArr;
        if (employeeAddData.addEmployee === "Finished!") {
            return arr; //return array w/o update, because nothing was added (i.e. finished)
        } else if (employeeAddData.addEmployee === "Intern") {
            const { name, email, id, school } = employeeAddData;
            const intern = new Intern(name, email, id, school);
            arr.push(intern);
            return promptEmployeeAdd(arr); //run function again, with new Intern added to the end
        } else if (employeeAddData.addEmployee === "Engineer") {
            const { name, email, id, github } = employeeAddData;
            const engineer = new Engineer(name, email, id, github);
            arr.push(engineer);
            return promptEmployeeAdd(arr); //run function again, with new Engineer added to the end
        }
    });
};

module.exports=promptEmployeeAdd;