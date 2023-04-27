import { AppError } from "../../errors/erros";
import fs from "fs";
const ffprobe = require("ffprobe");
const ffprobeStatic = require("ffprobe-static");

export const uploadVideoPostMidiaService = async (
  file: Express.Multer.File,
  path: string
): Promise<{ message: string }> => {
  const videoPath = `tmp/${path}`;
  let resultDuration: any;

  await ffprobe(videoPath, { path: ffprobeStatic.path })
    .then((info: { streams: { duration: any }[] }) => {
      resultDuration = info.streams[0].duration;
    })
    .catch((err: unknown) => {
      console.error(err);
    });

  if (resultDuration! > 31) {
    await fs.promises.unlink(videoPath);

    throw new AppError("The video can be a maximum of 30 seconds", 422);
  }

  return { message: "Video successful upload!" };
};
