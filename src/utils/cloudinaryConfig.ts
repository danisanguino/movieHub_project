import {v2 as cloudinary} from 'cloudinary';
import config from "../config/config"

    // Configuration
    cloudinary.config({ 
        cloud_name: config.cloudinary.CLOUD_NAME, 
        api_key: config.cloudinary.API_KEY, 
        api_secret: config.cloudinary.API_SECRET 
    });


export async function uploadImage (filePath: string) {

    return await cloudinary.uploader.upload(filePath, { folder: "sanguino" } )

} ;

export async function deleteImage (publicId: any){
    return await cloudinary.uploader.destroy(publicId)
} ;

export default cloudinary;

// export async function deleteImage(publicId: string) {
//     try {
//         const response = await cloudinary.uploader.destroy(publicId);
//         console.log("Image deleted from Cloudinary:", response);
//         return response;
//     } catch (error) {
//         console.error("Error deleting image from Cloudinary:", error);
//         throw error;
//     }
// }