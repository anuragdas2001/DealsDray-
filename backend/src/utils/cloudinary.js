import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  // cloudinary_url: process.env.CLOUDINARY_URL,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const UploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Inside Cloudinary ", localFilePath);
    if (!localFilePath) {
      return "No file path provided";
    }
    const uploadres = await cloudinary.uploader.upload(localFilePath, {
      folder: "assignment",
      resource_type: "auto",
    });

    console.log(uploadres);

    fs.unlinkSync(localFilePath);
    return uploadres;
  } catch (error) {
    console.error("Error in Cloudinary upload", error);
    fs.unlinkSync(localFilePath);
    return "Error in file upload";
  }
};
