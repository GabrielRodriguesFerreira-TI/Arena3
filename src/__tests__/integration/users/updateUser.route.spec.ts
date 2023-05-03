import supertest from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../models/User.model";
import { iCreateUser } from "../../../interfaces/users/users.types";
import { userUpdateMock } from "../../mocks/users/updateUser.route.mock";
import { generateToken } from "../../mocks/token/token.mock";
import { messageErrorMock } from "../../mocks/users/messageError.mock";

describe("PATCH /users", () => {
  const baseUrl: string = "/users";
  const updateInvalidIDUrlNumber: string =
    baseUrl + "/6452c31970aa5ce7e3073c76";
  const updateInvalidIDUrlString: string = baseUrl + "/aaaaaa";

  let request: supertest.SuperTest<supertest.Test>;
  let server: MongoMemoryServer;
  let userComplete: iCreateUser;
  let userExtra: iCreateUser;
  let updatedUserCompleteUrl: string;
  let updatedUserExtraUrl: string;

  beforeAll(async () => {
    server = await MongoMemoryServer.create();
    const uri = server.getUri();
    await mongoose.connect(uri, { autoIndex: true });
    request = supertest(app);
  });

  beforeEach(async () => {
    await User.deleteMany({});

    userComplete = new User({
      ...userUpdateMock.userComplete,
    });
    await userComplete.save();

    updatedUserCompleteUrl = baseUrl + `/${userComplete._id}`;

    userExtra = new User({
      ...userUpdateMock.userIsNotOwner,
    });
    await userComplete.save();

    updatedUserExtraUrl = baseUrl + `/${userExtra._id}`;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.stop();
  });

  it("Success: User must be able to self update - User token - Full body", async () => {
    const response = await request
      .patch(updatedUserCompleteUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        )}`
      )
      .query({
        accessToken: generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        ),
      })
      .send(userUpdateMock.userCompleteUpdateFull);

    const userUpdate = await User.findById(userComplete._id)
      .select("-password -isAdmin -__v")
      .lean();

    const expectResults = {
      status: 200,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        username: userUpdate?.username,
        email: userUpdate?.email,
        firstName: userUpdate?.firstName,
        lastName: userUpdate?.lastName,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body.createdAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
    expect(response.body.updatedAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
  });

  it("Success: User must be able to self update - User token - Partial", async () => {
    const response = await request
      .patch(updatedUserCompleteUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        )}`
      )
      .query({
        accessToken: generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        ),
      })
      .send(userUpdateMock.userCompleteUpdatePartial);

    const userUpdate = await User.findById(userComplete._id)
      .select("-password -isAdmin -__v")
      .lean();

    const expectResults = {
      status: 200,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        username: userUpdate?.username,
        email: userUpdate?.email,
        firstName: userUpdate?.firstName,
        lastName: userUpdate?.lastName,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    expect(response.body.createdAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
    expect(response.body.updatedAt).toEqual(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    );
  });

  it("Error: User must not be able to self update - User token - Invalid body types", async () => {
    const response = await request
      .patch(updatedUserCompleteUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        )}`
      )
      .query({
        accessToken: generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        ),
      })
      .send(userUpdateMock.userUpdateError);

    const expectResults = {
      status: 422,
      bodyMessage: {
        ...messageErrorMock.invalidTypesJoi,
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to update - Invalid ID Number", async () => {
    const response = await request
      .patch(updateInvalidIDUrlNumber)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        )}`
      )
      .query({
        accessToken: generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        ),
      })
      .send(userUpdateMock.userComplete);

    const expectResults = {
      status: 404,
      bodyEqual: {
        message: "User not found!",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to update - Invalid ID string", async () => {
    const response = await request
      .patch(updateInvalidIDUrlString)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        )}`
      )
      .query({
        accessToken: generateToken.isValidtoken(
          userComplete.isAdmin,
          userComplete.email,
          userComplete._id
        ),
      })
      .send(userUpdateMock.userComplete);

    console.log(response.body);

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
});
