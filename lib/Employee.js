class Employee{
    constructor(name,email,id){
        this.name=name;
        this.email=email;
        this.id=id;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";
    }
}

module.exports=Employee;

// The first class is an Employee parent class with the following properties and methods:

// name
// id
// email

// getName()
// getId()
// getEmail()
// getRole() // Returns 'Employee'