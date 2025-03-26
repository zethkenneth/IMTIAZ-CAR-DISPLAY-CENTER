import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'dge68oar6', 
  api_key: '762889769224983', 
  api_secret: 'r6sPFL2eFlKla2B72ukb9lpXk7A' 
});

export const uploadToDropbox = async (file, filename) => {
  try {
    // Convert file to base64
    let fileBuffer;
    if (file instanceof Buffer) {
      fileBuffer = file;
    } else {
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    }
    const base64File = fileBuffer.toString('base64');
    const uploadStr = `data:${file.type};base64,${base64File}`;

    // Upload to Cloudinary with optimization settings
    const uploadResponse = await cloudinary.uploader.upload(uploadStr, {
      folder: 'products',
      public_id: filename.split('.')[0], // Use filename without extension
      resource_type: 'auto',
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' },
        { width: 1200, crop: 'limit' } // Limit max width while maintaining aspect ratio
      ],
      overwrite: true
    });

    // Return the secure URL
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

// Optional: Add a function to delete files if needed
export const deleteFile = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error(`File deletion failed: ${error.message}`);
  }
};

// Test connection and initial token refresh
const testConnection = async () => {
  try {
    const dbx = await getDropboxClient();
    const response = await dbx.usersGetCurrentAccount();
    console.log('Dropbox connection successful:', response.result.email);
    return true;
  } catch (error) {
    console.error('Dropbox connection test failed:', error);
    return false;
  }
};

// Run initial test
testConnection(); 