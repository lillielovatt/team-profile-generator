function generateEmployeeSpecificInformation(employee) {
    let string = "";
    if (employee.getRole() === "Engineer") {
        string = `<span class="font-weight-bold"> GitHub: <span> <a href="https://github.com/${employee.github}">${employee.github}</a>`;
    } else if (employee.getRole() === "Manager") {
        string = `<span class="font-weight-bold">Office Number: </span>${employee.officeNumber}`;
    } else if (employee.getRole() === "Intern") {
        string = `<span class="font-weight-bold">School: </span>${employee.school}`;
    }
    return string;
};

function generateEmployeeDataHTML(teamArr, employeeType) {
    let string = "";
    teamArr.filter(employee => {
        //returns only the Employee type, keeps profiles ordered: Manager, Engineer, then Intern, as called in file below.
        return employee.getRole() === employeeType
    }).map(employee => {
        // checks to make sure such an Employee type exists; in the case that there are no Interns/no Engineers, for ex, it will return empty string
        if (employee.length != 0) {
            string += `
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title bg-info p-3">${employee.name} <br> ${employee.getRole()}</h5>
                        <p class="card-text">
                            <ul class="list-unstyled">
                                <li><span class="font-weight-bold">Email: </span><a href="mailto:${employee.email}">${employee.email}</a></li>
                                <li><span class="font-weight-bold">ID: ${employee.id}</span></li>
                                <li>
                                    ${generateEmployeeSpecificInformation(employee)}
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        `};
    });
    return string;
};

function generateHTML(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <!-- load bootstrap -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <title>Team Profile</title>
    </head>
    <body>
        <header class="font-italic text-center bg-warning py-5">My Team</header>
        <div class="row m-5 p-3">
            ${generateEmployeeDataHTML(data, "Manager")}
            ${generateEmployeeDataHTML(data, "Engineer")}
            ${generateEmployeeDataHTML(data, "Intern")}
        </div>
    </body>
    </html>
    `
};

module.exports = generateHTML;