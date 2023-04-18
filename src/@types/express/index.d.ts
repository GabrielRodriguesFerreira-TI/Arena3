export {};

declare global {
  namespace Express {
    interface Request {
      jwtEmailUser: string;
      jwtIdUser: string;
      jwtAdminUser: boolean;
    }
  }
}
