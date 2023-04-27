import fs from "fs";

export const deletePostMidiaService = async (
  file: string
): Promise<{ message: string }> => {
  await fs.promises.unlink(file);

  return { message: "Midia successful deleted!" };
};
