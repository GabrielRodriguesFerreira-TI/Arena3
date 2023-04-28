import fs from "fs";
import { videoUploadRateLimit } from "../../config/midiaRateLimit.config";
import JsonFileStore from "../../config/jsonFileStore.config";

export const deletePostMidiaService = async (
  file: string,
  userKey: string
): Promise<{ message: string }> => {
  const videoPath = `tmp/${file}`;
  const store = (videoUploadRateLimit as any).store as JsonFileStore;

  await fs.promises.unlink(videoPath);
  await store.decrement(userKey);

  return { message: "Midia successful deleted!" };
};
