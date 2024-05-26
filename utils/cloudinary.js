import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const upload = async (localImageFilePath) => {
  try {
    if (localImageFilePath) {
      const result = await cloudinary.uploader.upload(localImageFilePath, { resource_type: 'image' });
      return { imageURL: result.secure_url, imageId: result.public_id };
    } else {
      throw new Error("Cloudinary upload failed");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteImg = async (imageId) => {
  try {
    const result = await cloudinary.uploader.destroy(imageId, { resource_type: "image" });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
