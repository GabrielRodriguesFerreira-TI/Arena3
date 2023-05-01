import { iUploadVideo } from "../../interfaces/global/cloudinary.types";
import { uploadToCloudinary } from "../../logic/uploadStream.logic";

export const uploadVideoPostMidiaService = async (
  file: Express.Multer.File
): Promise<any> => {
  const result = (await uploadToCloudinary(file)) as iUploadVideo;

  const {
    api_key,
    asset_id,
    audio,
    bit_rate,
    bytes,
    etag,
    folder,
    format,
    frame_rate,
    height,
    is_audio,
    nb_frames,
    original_filename,
    pages,
    placeholder,
    rotation,
    signature,
    tags,
    types,
    width,
    video,
    ...response
  } = result;

  return response;
};
