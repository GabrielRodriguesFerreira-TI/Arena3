import "dotenv/config";
import { sign } from "jsonwebtoken";
import { Mixed } from "mongoose";

export const generateToken = {
  isValidtoken: (admin: boolean, email: string | Mixed, id: number) => {
    return sign({ admin, email }, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: "24h",
      subject: id.toString(),
    });
  },
  invalidSignature: sign({ admin: true }, "invalid_signature"),
  jwtMalFormed: "12345",
};
