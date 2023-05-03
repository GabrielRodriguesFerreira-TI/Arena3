import supertest from "supertest";
import app from "../../../app";
import { userCreateMock } from "../../mocks/users/createUser.route.mock";
import { messageErrorMock } from "../../mocks/users/messageError.mock";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../models/User.model";

describe("POST /users", () => {
  const baseUrl: string = "/users";
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

  it("Success: Must be able to create a user - Full body", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userComplete);

    const { password, ...bodyEqual } = userCreateMock.userComplete;

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(bodyEqual));
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body._id).toEqual(expect.any(String));
    expect(response.body.createdAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
    expect(response.body.updatedAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
  });

  it("Sucess: Must be able to create a user - user 'admin'", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userCompleteAdmin);

    const { password, ...bodyEqual } = userCreateMock.userCompleteAdmin;

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(bodyEqual));
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body.createdAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
    expect(response.body.updatedAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        isAdmin: true,
      })
    );
  });

  it("Error: Must not be able to create a user - Email already exists", async () => {
    const uniqueUser = new User({
      ...userCreateMock.userComplete,
    });
    await uniqueUser.save();

    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userUniqueEmail);

    const expectResults = {
      status: 409,
      bodyMessage: {
        message:
          'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "gabrielrf@gmail.com" }',
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Username already exists", async () => {
    const uniqueUser = new User({
      ...userCreateMock.userComplete,
    });

    await uniqueUser.save();

    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userUniqueUsername);

    const expectResults = {
      status: 409,
      bodyMessage: {
        message:
          'E11000 duplicate key error collection: test.users index: username_1 dup key: { username: "A3on" }',
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid body", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userInvalidBody);

    const expectResults = {
      status: 400,
      bodyMessage: {
        ...messageErrorMock.invalidBody,
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid Types", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userInvalidBodyType);

    const expectResults = {
      status: 400,
      bodyMessage: {
        ...messageErrorMock.invalidTypes,
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid body required keys", async () => {
    const response = await request
      .post(baseUrl)
      .send(userCreateMock.userInvalidKeys);

    const expectResults = {
      status: 400,
      bodyMessage: {
        ...messageErrorMock.requiredKeys,
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });
});
