import multer from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";
import { AppError } from "../errors/erros";
import { s3 } from "../config/upload.aws";

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "crud-mongodb-desenvolvimento",
    acl: "public-read",
    metadata: function (req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, new Date().toISOString() + "-" + file.originalname);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
  fileFilter: function (req: Request, file: Express.Multer.File, cb: Function) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new AppError("Only image files are allowed!", 400));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB
  },
});
