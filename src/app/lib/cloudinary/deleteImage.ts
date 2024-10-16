import cloudinary from 'cloudinary';

// Configure Cloudinary (can be done globally)
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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
        const result = await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'image' });
        return result;
    } catch (error:any) {
        throw new Error(`Error deleting image from Cloudinary: ${error.message}`);
    }
};

export { deleteImageFromCloudinary };
