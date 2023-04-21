import S3Storage from "../../utils/S3Storage";

export const uploadUserProfileImageService = async (
  file: Express.Multer.File
): Promise<any> => {
  const s3Storage = new S3Storage();

  await s3Storage.saveFile(file.filename);

  return { message: "Image updated successfully!" };
};
