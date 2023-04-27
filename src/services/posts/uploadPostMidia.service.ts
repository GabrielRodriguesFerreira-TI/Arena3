import { iPayloadUploadMidia } from "../../interfaces/posts/posts.types";
import imageProfileMulter from "../../config/imageProfile.multer";
import postMidiaMulter from "../../config/postMidia.multer";
import multer from "multer";
import { AppError } from "../../errors/erros";

export const uploadPostMidiaService = async (
  payload: iPayloadUploadMidia
): Promise<{ message: string }> => {
  const { fileType, req, res } = payload;
  const uploadImage = multer(imageProfileMulter);
  const uploadPostMidia = multer(postMidiaMulter.config);

  if (fileType === "video") {
    uploadPostMidia.single("video")(req, res, (err: unknown) => {
      if (err) {
        throw new AppError(`${err}`, 400);
      }
    });
  } else if (fileType === "image") {
    uploadImage.single("image")(req, res, (err: unknown) => {
      if (err) {
        throw new AppError(`${err}`, 400);
      }
    });
  } else {
    throw new AppError("Invalid file type!", 400);
  }

  return { message: "Midia successful upload." };
};
