import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINART_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.NODE_ENV === "production",
});

export const uploadToCloudinary = (
  buffer: Buffer<ArrayBufferLike>,
  publicId?: string
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          allowed_formats: ["png", "jpg", "webp"],
          resource_type: "image",
          folder: "project",
          public_id: publicId,
          transformation: { quality: "auto" },
        },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      )
      .end(buffer);
  });
};

export const deleteThumbnail = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
