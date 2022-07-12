const Employee=require("./Employee");

class Manager extends Employee {
    constructor(name, email, id, officeNumber) {
        super(name, email, id);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;

// In addition to Employee's properties and methods, Manager will also have:

// officeNumber

// getRole() // Overridden to return 'Manager'

