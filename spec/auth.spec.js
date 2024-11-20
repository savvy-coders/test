const Auth = require('../auth');

describe("User Authentication System", () => {
  let auth;

  beforeEach(() => {
    auth = new Auth();
  });

  it("should register a user", () => {
    auth.register("user1", "password123");
    expect(auth.users).toContain({ username: "user1", password: "password123" });
  });

  it("should allow a user to log in with correct credentials", () => {
    auth.register("user2", "securePassword");
    const result = auth.login("user2", "securePassword");
    expect(result).toBe(true);
  });

  it("should deny login with incorrect credentials", () => {
    auth.register("user3", "anotherPassword");
    const result = auth.login("user3", "wrongPassword");
    expect(result).toBe(false);
  });

  it("should deny login for non-existent users", () => {
    const result = auth.login("nonExistentUser", "noPassword");
    expect(result).toBe(false);
  });
});
