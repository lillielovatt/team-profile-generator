const Manager=require("../lib/Manager");

test("creates a new manager object", () => {
    const manager = new Manager("Des", "email", 23, 43);
    expect(manager.name).toBe("Des");
    expect(manager.email).toBe("email");
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("gets name", () => {
    const manager = new Manager("Des", "email", 23, 43);
    expect(manager.getName()).toBe("Des");
});

test("gets email", () => {
    const manager = new Manager("Des", "email", 23, 43);
    expect(manager.getEmail()).toBe("email");
});

test("gets ID", () => {
    const manager = new Manager("Des", "email", 23, 43);
    expect(manager.getId()).toEqual(expect.any(Number));
});

test("gets role", () => {
    const manager = new Manager("Des", "email", 23, 43);
    expect(manager.getRole()).toBe("Manager");
});