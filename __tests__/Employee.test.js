const Employee = require("../lib/Employee");

test("creates a new employee object", () => {
    const employee = new Employee("Des", "email", 43);
    expect(employee.name).toBe("Des");
    expect(employee.email).toBe("email");
    expect(employee.id).toEqual(expect.any(Number));
});

test("gets name", () => {
    const employee = new Employee("Des", "email", 43);
    expect(employee.getName()).toBe("Des");
});

test("gets email", () => {
    const employee = new Employee("Des", "email", 43);
    expect(employee.getEmail()).toBe("email");
});

test("gets ID", () => {
    const employee = new Employee("Des", "email", 43);
    expect(employee.getId()).toEqual(expect.any(Number));
});

test("gets role", () => {
    const employee = new Employee("Des", "email", 43);
    expect(employee.getRole()).toBe("Employee");
});