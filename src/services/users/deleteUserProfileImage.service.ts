import S3Storage from "../../utils/S3Storage";

export const deleteUserProfileImageService = async (
  file: string
): Promise<void> => {
  const s3Storage = new S3Storage();

  await s3Storage.deleteFile(file);
};
