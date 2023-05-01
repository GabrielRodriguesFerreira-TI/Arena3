const cloudinary = require("cloudinary").v2;

export const uploadImagePostMidiaService = async (
  public_id: string
): Promise<{
  publicId: string;
  url: string;
}> => {
  const file = await cloudinary.api.resource(public_id);

  return { publicId: `${public_id}`, url: `${file.url}` };
};
