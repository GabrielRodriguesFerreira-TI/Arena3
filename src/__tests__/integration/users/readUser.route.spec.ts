import supertest from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../models/User.model";
import {
  iCreateUser,
  iCreateUserReturn,
  iRetrieveUserPagination,
  iRetrieveUserPaginationTest,
} from "../../../interfaces/users/users.types";
import { userRetrieveAll } from "../../mocks/users/readUser.route.mock";
import { generateToken } from "../../mocks/token/token.mock";

describe("GET /users", () => {
  const baseUrl: string = "/users";
  const retrieveInvalidIDUrlNumber: string =
    baseUrl + "/6452c31970aa5ce7e3073c76";
  const retrieveInvalidIDUrlString: string = baseUrl + "/aaaaaa";

  let request: supertest.SuperTest<supertest.Test>;
  let server: MongoMemoryServer;
  let readUsers: iRetrieveUserPagination;
  let readOneUser: iCreateUserReturn | null;
  let userCreate: iCreateUser;

  let retrieveUserCompleteUrl: string;

  beforeAll(async () => {
    server = await MongoMemoryServer.create();
    const uri = server.getUri();
    await mongoose.connect(uri, { autoIndex: true });

    await User.create([
      { ...userRetrieveAll.userRetrieve1 },
      { ...userRetrieveAll.userRetrieve2 },
      { ...userRetrieveAll.userRetrieve3 },
      { ...userRetrieveAll.userRetrieve4 },
      { ...userRetrieveAll.userRetrieve5 },
    ]);

    userCreate = new User({
      ...userRetrieveAll.userCreate,
    });
    await userCreate.save();

    retrieveUserCompleteUrl = baseUrl + `/${userCreate._id}`;

    const query = { deletedAt: { $exists: false } };
    const options = {
      page: 1,
      limit: 5,
      select: "-password -__v",
      sort: { createdAt: -1 },
      lean: true,
      customLabels: {
        totalDocs: "total",
        docs: "users",
      },
    };

    readUsers = await User.paginate(query, options);
    readOneUser = await User.findById(userCreate._id);

    request = supertest(app);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.stop();
  });

  it("Success: Must be able list all users", async () => {
    const response = await request
      .get(baseUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userCreate.isAdmin,
          userCreate.email,
          userCreate._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userCreate.isAdmin,
          userCreate.email,
          userCreate._id
        )}`,
      })
      .send();

    const expectResults = {
      status: 200,
      bodyEqual: readUsers as unknown as iRetrieveUserPaginationTest,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        total: expectResults.bodyEqual.total,
        limit: expectResults.bodyEqual.limit,
        totalPages: expectResults.bodyEqual.totalPages,
        page: expectResults.bodyEqual.page,
        hasNextPage: expectResults.bodyEqual.hasNextPage,
        hasPrevPage: expectResults.bodyEqual.hasPrevPage,
        nextPage: expectResults.bodyEqual.nextPage,
        prevPage: expectResults.bodyEqual.prevPage,
        pagingCounter: expectResults.bodyEqual.pagingCounter,
        users: expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            id: expect.any(String),
            username: expect.any(String),
            email: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      })
    );
    expect(response.body.users).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({ password: expect.any(String) }),
      ])
    );
  });

  it("Success: Must be able list one user - ID User", async () => {
    const response = await request
      .get(retrieveUserCompleteUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userCreate.isAdmin,
          userCreate.email,
          userCreate._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userCreate.isAdmin,
          userCreate.email,
          userCreate._id
        )}`,
      })
      .send();

    const expectResults = {
      status: 200,
      bodyEqual: readOneUser,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        username: readOneUser?.username,
        email: readOneUser?.email,
        firstName: readOneUser?.firstName,
        lastName: readOneUser?.lastName,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(response.body).toEqual(
      expect.not.objectContaining({
        password: expect.any(String),
      })
    );
  });

  it("Error: Must not be able list one user - Invalid ID number", async () => {
    const response = await request
      .get(retrieveInvalidIDUrlNumber)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userCreate.isAdmin,
          userCreate.email,
          userCreate._id
        )}`
      )
      .query({
        accessToken: `${generateToken.isValidtoken(
          userCreate.isAdmin,
          userCreate.email,
          userCreate._id
        )}`,
      })
      .send();

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
      .patch(retrieveInvalidIDUrlString)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userCreate.isAdmin,
          userCreate.email,
          userCreate._id
        )}`
      )
      .query({
        accessToken: generateToken.isValidtoken(
          userCreate.isAdmin,
          userCreate.email,
          userCreate._id
        ),
      })
      .send();

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

  it("Error: Must not be able list all users: Missing token", async () => {
    const response = await request.get(baseUrl).send();

    const expectResults = {
      status: 401,
      bodyEqual: {
        message: "Missing bearer token",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able list all users: Invalid signature", async () => {
    const response = await request
      .get(baseUrl)
      .set("Authorization", `Bearer ${generateToken.invalidSignature}`)
      .query({ accessToken: `${generateToken.invalidSignature}` })
      .send();

    const expectResults = {
      status: 401,
      bodyEqual: {
        message: "invalid signature",
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able list all users: JWT malformed", async () => {
    const response = await request
      .get(baseUrl)
      .set("Authorization", `Bearer ${generateToken.jwtMalFormed}`)
      .query({ accessToken: `${generateToken.jwtMalFormed}` })
      .send();

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
