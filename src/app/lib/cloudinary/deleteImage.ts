import cloudinary from 'cloudinary';
import config from '../../config';

// Configure Cloudinary (can be done globally)
cloudinary.v2.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Function to delete an image from Cloudinary using publicId
/**
 * @description
 * Delete an image from Cloudinary
 * @param {string} publicId
 * */
const deleteImageFromCloudinary = async (publicId: string): Promise<any> => {
  if (!publicId) {
    throw new Error('No public ID provided');
  }

  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: 'image',
    });
    return result;
  } catch (error: any) {
    throw new Error(`Error deleting image from Cloudinary: ${error.message}`);
  }
};

export { deleteImageFromCloudinary };
