import ffmpeg from "fluent-ffmpeg";
import { AppError } from "../errors/erros";

export const limitDuration = async (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const duration = metadata.format.duration!;
        if (duration > 30) {
          reject(
            new AppError("The video duration should not exceed 30 seconds", 400)
          );
        } else {
          resolve();
        }
      }
    });
  });
};
