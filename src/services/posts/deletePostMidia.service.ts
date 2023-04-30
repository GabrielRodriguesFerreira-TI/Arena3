import fs from "fs";
import JsonFileStore from "../../config/jsonFileStore.config";

export const deletePostMidiaService = async (
  file: string,
  userKey: string
): Promise<{ message: string }> => {
  const videoPath = `tmp/${file}`;
  const store = new JsonFileStore("imageUploadRateLimit.json");
  await store.decrement(userKey);
  await fs.promises.unlink(videoPath);

  return { message: "Midia successful deleted!" };
};
