import S3Storage from "../../utils/S3Storage";
import crypto from "crypto";

export const uploadMidiaPostService = async (
  file: Express.Multer.File | undefined
): Promise<{ message: string }> => {
  const fileName = `${crypto.randomBytes(10).toString("hex")}-${
    file!.originalname
  }`;

  const s3Storage = new S3Storage();

  await s3Storage.savePostFile(fileName, file!.buffer);

  return { message: `${fileName}` };
};
