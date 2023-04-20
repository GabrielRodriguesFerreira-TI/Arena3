declare global {
  namespace Express {
    interface Request {
      jwtEmailUser: string;
      jwtIdUser: string;
      jwtAdminUser: boolean;
    }
  }
}

export interface MulterS3File extends Express.MulterS3.File {
  location: string;
}
