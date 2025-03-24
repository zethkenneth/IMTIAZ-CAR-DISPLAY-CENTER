import multer from 'multer';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import crypto from 'crypto';
import { uploadToDropbox } from '../services/dropboxService';

// Define upload directory path
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'products');

console.log('Initializing upload utility...');
console.log('Upload directory path:', UPLOAD_DIR);

// Create upload directory if it doesn't exist
try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    console.log('Creating upload directory...');
    fs.mkdirSync(UPLOAD_DIR, { recursive: true, mode: 0o777 });
  }
} catch (err) {
  console.error('Error creating upload directory:', err);
}

// Generate MD5 hash for file content
function getFileHash(buffer) {
  return crypto.createHash('md5').update(buffer).digest('hex');
}

// Check if file already exists by content hash
function findExistingFile(hash) {
  try {
    const files = fs.readdirSync(UPLOAD_DIR);
    const hashesFile = path.join(UPLOAD_DIR, 'file_hashes.json');
    let hashes = {};
    
    if (fs.existsSync(hashesFile)) {
      hashes = JSON.parse(fs.readFileSync(hashesFile, 'utf8'));
    }
    
    return hashes[hash];
  } catch (error) {
    console.error('Error checking file existence:', error);
    return null;
  }
}

// Save hash to tracking file
function saveFileHash(hash, filename) {
  try {
    const hashesFile = path.join(UPLOAD_DIR, 'file_hashes.json');
    let hashes = {};
    
    if (fs.existsSync(hashesFile)) {
      hashes = JSON.parse(fs.readFileSync(hashesFile, 'utf8'));
    }
    
    hashes[hash] = `/uploads/products/${filename}`;
    fs.writeFileSync(hashesFile, JSON.stringify(hashes, null, 2));
  } catch (error) {
    console.error('Error saving file hash:', error);
  }
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Multer handling file upload to:', UPLOAD_DIR);
    // Double-check directory exists before saving
    if (!fs.existsSync(UPLOAD_DIR)) {
      console.log('Creating upload directory during file upload...');
      fs.mkdirSync(UPLOAD_DIR, { recursive: true, mode: 0o777 });
    }
    cb(null, UPLOAD_DIR);
  },
  filename: async function (req, file, cb) {
    const fileBuffer = file.buffer;
    const hash = getFileHash(fileBuffer);
    const existingUrl = findExistingFile(hash);
    
    if (existingUrl) {
      // File already exists, don't save it again
      file.url = existingUrl;
      cb(null, ''); // Don't save the file
    } else {
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const filename = `product-${uniqueSuffix}${ext}`;
      
      // Save hash mapping
      saveFileHash(hash, filename);
      file.url = `/uploads/products/${filename}`;
      cb(null, filename);
    }
  }
});

// Configure multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    console.log('Processing file:', file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      console.log('File rejected - not an image:', file.originalname);
      return cb(new Error('Only image files are allowed!'), false);
    }
    console.log('File accepted:', file.originalname);
    cb(null, true);
  }
});

// Middleware runner
export const runMiddleware = (req, middleware) => {
  console.log('Running upload middleware...');
  return new Promise((resolve, reject) => {
    middleware(req, {
      end: (end) => {},
      setHeader: (header) => {},
    }, (result) => {
      if (result instanceof Error) {
        console.error('Middleware error:', result);
        return reject(result);
      }
      console.log('Middleware completed successfully');
      return resolve(result);
    });
  });
};

// Helper function to ensure upload directory exists
export const ensureUploadDirectory = () => {
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true, mode: 0o777 });
      console.log('Upload directory created:', UPLOAD_DIR);
    }
    return true;
  } catch (err) {
    console.error('Error ensuring upload directory exists:', err);
    return false;
  }
};

// Ensure the upload directory exists
async function ensureDir(dir) {
  try {
    await fsPromises.access(dir);
  } catch {
    await fsPromises.mkdir(dir, { recursive: true });
  }
}

// Generate a unique filename
function generateUniqueFilename(originalName) {
  const ext = path.extname(originalName) || '.jpg'; // Default to .jpg if no extension
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}${ext}`;
}

// Save a single file
async function saveFile(file) {
  try {
    // Check if file is a File/Blob object
    if (!(file instanceof Blob)) {
      throw new Error('Invalid file object');
    }

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate filename
    const filename = generateUniqueFilename(file.name || 'upload.jpg');
    const filePath = path.join(UPLOAD_DIR, filename);
    
    // Save file
    await fsPromises.writeFile(filePath, buffer);
    console.log('File saved:', filePath);
    
    // Return relative URL
    return `/uploads/products/${filename}`;
  } catch (error) {
    console.error('Error saving individual file:', error);
    throw error;
  }
}

// Save multiple files and return their URLs
export async function saveUploadedFiles(files) {
  if (!files || files.length === 0) {
    return [];
  }

  try {
    // Ensure upload directory exists
    await ensureDir(UPLOAD_DIR);
    console.log('Upload directory ready:', UPLOAD_DIR);

    // Process all files
    const urls = [];
    for (const file of files) {
      try {
        const url = await saveFile(file);
        urls.push(url);
      } catch (error) {
        console.error('Error processing file:', error);
        // Continue with next file
      }
    }
    
    console.log('Processed files:', urls);
    return urls;
  } catch (error) {
    console.error('Error in saveUploadedFiles:', error);
    throw error;
  }
}

// Helper function to process files and get URLs
export async function processFiles(files) {
  const urls = [];
  
  for (const file of files) {
    try {
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.name);
      const filename = `product-${uniqueSuffix}${ext}`;
      
      console.log('Processing file:', filename);
      
      // Upload to Dropbox
      const directLink = await uploadToDropbox(file, filename);
      if (!directLink) {
        throw new Error('No URL returned from Dropbox upload');
      }
      
      console.log('File uploaded successfully:', directLink);
      urls.push(directLink);
    } catch (error) {
      console.error('Error processing file:', error);
      throw new Error(`File upload failed for ${file.name}: ${error.message}`);
    }
  }
  
  if (urls.length === 0 && files.length > 0) {
    throw new Error('No files were successfully uploaded');
  }
  
  return urls;
} 