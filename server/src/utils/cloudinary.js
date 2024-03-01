import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET_KEY}`,
});

const uploadInCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // todo: upload File in cloudinary
    const responce = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //? return message
    // console.log("file uploaded successfully", responce.url);
    return responce;
  } catch (error) {
    fs.unlinkSync(localFilePath); //! when file is not uploaded or failed to upload then
    // console.log(error);
    return null;
  }
};

export { uploadInCloudinary };
