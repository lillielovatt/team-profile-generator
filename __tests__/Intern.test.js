const Intern = require("../lib/Intern");

test("creates a new Intern object", () => {
    const intern = new Intern("Des", "email", 43, "university");
    expect(intern.name).toBe("Des");
    expect(intern.email).toBe("email");
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.school).toBe("university");
});

test("gets name", () => {
    const intern = new Intern("Des", "email", 43, "university");
    expect(intern.getName()).toBe("Des");
});

test("gets email", () => {
    const intern = new Intern("Des", "email", 43, "university");
    expect(intern.getEmail()).toBe("email");
});

test("gets ID", () => {
    const intern = new Intern("Des", "email", 43, "university");
    expect(intern.getId()).toEqual(expect.any(Number));
});

test("gets school", () => {
    const intern = new Intern("Des", "email", 43, "university");
    expect(intern.getSchool()).toBe("university");
});

test("gets role", () => {
    const intern = new Intern("Des", "email", 43, "university");
    expect(intern.getRole()).toBe("Intern");
});