export const messageErrorMock = {
  invalidBody: {
    username: {
      name: "ValidatorError",
      message:
        "Path `username` (`mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`) is longer than the maximum allowed length (50).",
      properties: {
        message:
          "Path `username` (`mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`) is longer than the maximum allowed length (50).",
        type: "maxlength",
        maxlength: 50,
        path: "username",
        value: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      },
      kind: "maxlength",
      path: "username",
      value: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    },
    email: {
      name: "ValidatorError",
      message: "Email is invalid!",
      properties: {
        message: "Email is invalid!",
        type: "user defined",
        path: "email",
        value: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      },
      kind: "user defined",
      path: "email",
      value: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    },
    firstName: {
      name: "ValidatorError",
      message:
        "Path `firstName` (`mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`) is longer than the maximum allowed length (50).",
      properties: {
        message:
          "Path `firstName` (`mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`) is longer than the maximum allowed length (50).",
        type: "maxlength",
        maxlength: 50,
        path: "firstName",
        value: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      },
      kind: "maxlength",
      path: "firstName",
      value: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    },
    lastName: {
      name: "ValidatorError",
      message:
        "Path `lastName` (`mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`) is longer than the maximum allowed length (50).",
      properties: {
        message:
          "Path `lastName` (`mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`) is longer than the maximum allowed length (50).",
        type: "maxlength",
        maxlength: 50,
        path: "lastName",
        value: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      },
      kind: "maxlength",
      path: "lastName",
      value: "mais de 50 caracteres!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    },
  },
  invalidTypes: {
    email: {
      stringValue: '"[]"',
      valueType: "Array",
      kind: "string",
      value: [],
      path: "email",
      reason: null,
      name: "CastError",
      message:
        'Cast to string failed for value "[]" (type Array) at path "email"',
    },
    firstName: {
      stringValue: '"{}"',
      valueType: "Object",
      kind: "string",
      value: {},
      path: "firstName",
      reason: null,
      name: "CastError",
      message:
        'Cast to string failed for value "{}" (type Object) at path "firstName"',
    },
    password: {
      name: "ValidatorError",
      message:
        "Path `password` (`1234`) is shorter than the minimum allowed length (6).",
      properties: {
        message:
          "Path `password` (`1234`) is shorter than the minimum allowed length (6).",
        type: "minlength",
        minlength: 6,
        path: "password",
        value: "1234",
      },
      kind: "minlength",
      path: "password",
      value: "1234",
    },
  },
  requiredKeys: {
    lastName: {
      name: "ValidatorError",
      message: "Path `lastName` is required.",
      properties: {
        message: "Path `lastName` is required.",
        type: "required",
        path: "lastName",
      },
      kind: "required",
      path: "lastName",
    },
    firstName: {
      name: "ValidatorError",
      message: "Path `firstName` is required.",
      properties: {
        message: "Path `firstName` is required.",
        type: "required",
        path: "firstName",
      },
      kind: "required",
      path: "firstName",
    },
    username: {
      name: "ValidatorError",
      message: "Path `username` is required.",
      properties: {
        message: "Path `username` is required.",
        type: "required",
        path: "username",
      },
      kind: "required",
      path: "username",
    },
  },
};
