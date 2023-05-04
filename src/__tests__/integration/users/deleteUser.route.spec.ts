import supertest from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../models/User.model";
import { iCreateUser } from "../../../interfaces/users/users.types";
import { userDeleteMock } from "../../mocks/users/deleteUser.route.mock";
import { generateToken } from "../../mocks/token/token.mock";

describe("DELETE /users", () => {
  const baseUrl: string = "/users";
  const baseUrlDeactivated: string = "/users/deactivated";
  const destroyInvalidIDUrlNumber: string =
    baseUrl + "/6452c31970aa5ce7e3073c76";
  const destroyInvalidIDUrlString: string = baseUrl + "/aaaaaa";

  let request: supertest.SuperTest<supertest.Test>;
  let server: MongoMemoryServer;

  let userAdmin: iCreateUser;
  let userNotAdmin: iCreateUser;
  let userExtra: iCreateUser;

  let destroyAdminUrl: string;
  let destroyUserUrl: string;
  let destroyUserExtraUrl: string;

  let deactivatedAdminUrl: string;
  let deactivatedUserUrl: string;
  let deactivatedUserExtraUrl: string;

  beforeAll(async () => {
    server = await MongoMemoryServer.create();
    const uri = server.getUri();
    await mongoose.connect(uri, { autoIndex: true });
    request = supertest(app);
  });

  beforeEach(async () => {
    await User.deleteMany({});

    userAdmin = new User({
      ...userDeleteMock.userAdmin,
    });
    await userAdmin.save();

    userNotAdmin = new User({
      ...userDeleteMock.userOwner,
    });
    await userNotAdmin.save();

    userExtra = new User({
      ...userDeleteMock.userIsNotOwner,
    });
    await userExtra.save();

    destroyAdminUrl = baseUrl + `/${userAdmin._id}`;
    destroyUserUrl = baseUrl + `/${userNotAdmin._id}`;
    destroyUserExtraUrl = baseUrl + `/${userExtra._id}`;

    deactivatedAdminUrl = baseUrlDeactivated + `/${userAdmin._id}`;
    deactivatedUserUrl = baseUrlDeactivated + `/${userNotAdmin._id}`;
    deactivatedUserExtraUrl = baseUrlDeactivated + `/${userExtra._id}`;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.stop();
  });

  it("Success: Admin must be able to delete a user - Admin token", async () => {
    const response = await request
      .delete(destroyUserUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userAdmin.isAdmin,
          userAdmin.email,
          userAdmin._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userAdmin.isAdmin,
          userAdmin.email,
          userAdmin._id
        )}`,
      });

    const expectResults = {
      status: 204,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({});
  });

  it("Success: User must be able to delete a user - User token", async () => {
    const response = await request
      .delete(destroyUserUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userNotAdmin.isAdmin,
          userNotAdmin.email,
          userNotAdmin._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userNotAdmin.isAdmin,
          userNotAdmin.email,
          userNotAdmin._id
        )}`,
      });

    const expectResults = {
      status: 204,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({});
  });

  it("Success: Admin must be able to deactivated a user - Admin token", async () => {
    const response = await request
      .delete(deactivatedUserUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userAdmin.isAdmin,
          userAdmin.email,
          userAdmin._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userAdmin.isAdmin,
          userAdmin.email,
          userAdmin._id
        )}`,
      });

    const expectResults = {
      status: 204,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({});
  });

  it("Success: User must be able to deactivated a user - User token", async () => {
    const response = await request
      .delete(deactivatedUserUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userNotAdmin.isAdmin,
          userNotAdmin.email,
          userNotAdmin._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userNotAdmin.isAdmin,
          userNotAdmin.email,
          userNotAdmin._id
        )}`,
      });

    const expectResults = {
      status: 204,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({});
  });

  it("Error: User must not be able to delete another user - User token", async () => {
    const response = await request
      .delete(destroyUserExtraUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userNotAdmin.isAdmin,
          userNotAdmin.email,
          userNotAdmin._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userNotAdmin.isAdmin,
          userNotAdmin.email,
          userNotAdmin._id
        )}`,
      });

    const expectResults = {
      status: 403,
      bodyEqual: {
        message: "Insufficient permission",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: User must not be able to deactivate another user - User token", async () => {
    const response = await request
      .delete(deactivatedUserExtraUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userNotAdmin.isAdmin,
          userNotAdmin.email,
          userNotAdmin._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userNotAdmin.isAdmin,
          userNotAdmin.email,
          userNotAdmin._id
        )}`,
      });

    const expectResults = {
      status: 403,
      bodyEqual: {
        message: "Insufficient permission",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to destroy - Invalid ID number", async () => {
    const response = await request
      .delete(destroyInvalidIDUrlNumber)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userAdmin.isAdmin,
          userAdmin.email,
          userAdmin._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userAdmin.isAdmin,
          userAdmin.email,
          userAdmin._id
        )}`,
      });

    const expectResults = {
      status: 404,
      bodyEqual: {
        message: "User not found!",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to destroy - Invalid ID string", async () => {
    const response = await request
      .delete(destroyInvalidIDUrlString)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userAdmin.isAdmin,
          userAdmin.email,
          userAdmin._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userAdmin.isAdmin,
          userAdmin.email,
          userAdmin._id
        )}`,
      });

    const expectResults = {
      status: 404,
      bodyEqual: {
        message:
          'Cast to ObjectId failed for value "aaaaaa" (type string) at path "_id" for model "Users"',
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to destroy - Missing bearer", async () => {
    const response = await request.delete(destroyAdminUrl);

    const expectResults = {
      status: 401,
      bodyEqual: {
        message: "Missing bearer token",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to destroy - Invalid signature", async () => {
    const response = await request
      .delete(destroyAdminUrl)
      .set("Authorization", `Bearer ${generateToken.invalidSignature}`)
      .query({ accessToken: `${generateToken.invalidSignature}` });

    const expectResults = {
      status: 401,
      bodyEqual: {
        message: "invalid signature",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to destroy - JWT malformed", async () => {
    const response = await request
      .delete(destroyAdminUrl)
      .set("Authorization", `Bearer ${generateToken.jwtMalFormed}`)
      .query({ accessToken: `${generateToken.jwtMalFormed}` });

    const expectResults = {
      status: 401,
      bodyEqual: {
        message: "jwt malformed",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });
});
