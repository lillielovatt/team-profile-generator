const Engineer = require("../lib/Engineer");

test("creates a new engineer object", () => {
    const engineer = new Engineer("Des", "email", 43, "github");
    expect(engineer.name).toBe("Des");
    expect(engineer.email).toBe("email");
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.github).toBe("github");
});

test("gets name", () => {
    const engineer = new Engineer("Des", "email", 43, "github");
    expect(engineer.getName()).toBe("Des");
});

test("gets email", () => {
    const engineer = new Engineer("Des", "email", 43, "github");
    expect(engineer.getEmail()).toBe("email");
});

test("gets ID", () => {
    const engineer = new Engineer("Des", "email", 43, "github");
    expect(engineer.getId()).toEqual(expect.any(Number));
});

test("gets github", () => {
    const engineer = new Engineer("Des", "email", 43, "github");
    expect(engineer.getGithub()).toBe("github");
});

test("gets role", () => {
    const engineer = new Engineer("Des", "email", 43, "github");
    expect(engineer.getRole()).toBe("Engineer");
});