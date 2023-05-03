import supertest from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../models/User.model";
import { userLoginMock } from "../../mocks/users/loginUser.route.mock";

describe("POST /login", () => {
  const baseUrl: string = "/login";
  const baseUrlRefresh: string = baseUrl + "/token";
  const baseUrlLogout: string = "/logout";

  let request: supertest.SuperTest<supertest.Test>;
  let server: MongoMemoryServer;

  beforeAll(async () => {
    server = await MongoMemoryServer.create();
    const uri = server.getUri();
    await mongoose.connect(uri, { autoIndex: true });
    request = supertest(app);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.stop();
  });

  it("Success: Must be able to login", async () => {
    const user = new User({
      ...userLoginMock.userActivate,
    });
    await user.save();

    const response = await request.post(baseUrl).send({
      email: userLoginMock.userActivate.email,
      password: userLoginMock.userActivate.password,
    });

    const expectResults = {
      status: 200,
      bodyEqual: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Success: Must be able to refresh user token", async () => {
    const user = new User({
      ...userLoginMock.userActivate,
    });
    await user.save();

    const login = await request.post(baseUrl).send({
      email: userLoginMock.userActivate.email,
      password: userLoginMock.userActivate.password,
    });

    const response = await request.post(
      `${baseUrlRefresh}?refreshToken=${login.body.refreshToken}`
    );

    const expectResults = {
      status: 200,
      bodyEqual: {
        message: "Access token successfully renewed!",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Success: Must be able to logout user", async () => {
    const user = new User({
      ...userLoginMock.userActivate,
    });
    await user.save();

    const login = await request.post(baseUrl).send({
      email: userLoginMock.userActivate.email,
      password: userLoginMock.userActivate.password,
    });

    const response = await request
      .post(`${baseUrlLogout}?accessToken=${login.body.accessToken}`)
      .set("Authorization", `Bearer ${login.body.accessToken}`);

    const expectResults = {
      status: 200,
      bodyEqual: {
        message: "Successfully logged out!",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to login - Invalid credential 1 - Wrong password", async () => {
    const user = new User({
      ...userLoginMock.userActivate,
    });
    await user.save();

    const response = await request.post(baseUrl).send({
      email: userLoginMock.userInvalidCredential1.email,
      password: userLoginMock.userInvalidCredential1.password,
    });

    const expectResults = {
      status: 401,
      bodyEqual: { message: "Incorrect password" },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to login - Invalid credential 2 - Wrong email", async () => {
    const user = new User({
      ...userLoginMock.userActivate,
    });
    await user.save();

    const response = await request.post(baseUrl).send({
      email: userLoginMock.userInvalidCredential2.email,
      password: userLoginMock.userInvalidCredential2.password,
    });

    const expectResults = {
      status: 401,
      bodyEqual: {
        message: "Email not registered, please register a new email!",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to login - Invalid credential 3 - User deactivated", async () => {
    const user = new User({
      ...userLoginMock.userToInactive,
    });
    user.deletedAt = new Date();
    await user.save();

    const response = await request.post(baseUrl).send({
      email: userLoginMock.userToInactive.email,
      password: userLoginMock.userToInactive.password,
    });

    const expectResults = {
      status: 403,
      bodyEqual: { message: "User deactivated!" },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to refresh token - Invalid token", async () => {
    const user = new User({
      ...userLoginMock.userActivate,
    });
    await user.save();

    const login = await request.post(baseUrl).send({
      email: userLoginMock.userActivate.email,
      password: userLoginMock.userActivate.password,
    });

    const invalidToken = login.body.refreshToken.slice(0, -1) + "X";

    const response = await request
      .post(baseUrlRefresh)
      .query({ refreshToken: invalidToken });

    const expectResults = {
      status: 401,
      bodyEqual: { message: "invalid signature" },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });
});
