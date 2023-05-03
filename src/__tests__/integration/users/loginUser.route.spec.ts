import supertest from "supertest";
import app from "../../../app";
import { messageErrorMock } from "../../mocks/users/messageError.mock";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../models/User.model";
import { userLoginMock } from "../../mocks/users/loginUser.route.mock";

describe("POST /login", () => {
  const baseUrl: string = "/login";
  const baseUrlRefresh: string = baseUrl + "/token";
  const baseUrlLogout: string = "/users/logout";

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
});
