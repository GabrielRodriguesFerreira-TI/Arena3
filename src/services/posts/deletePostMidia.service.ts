import fs from "fs";

export const deletePostMidiaService = async (
  file: string
): Promise<{ message: string }> => {
  const videoPath = `tmp/${file}`;

  await fs.promises.unlink(videoPath);

  return { message: "Midia successful deleted!" };
};
