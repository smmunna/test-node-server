import path from 'path';
import fs from 'fs';
import { Request } from 'express';

/**
 * Save a file to a specified folder and return its URL.
 * @param fileBuffer - The file buffer to save.
 * @param originalName - The original name of the file (for extension).
 * @param folderPath - The folder path where the file should be saved.
 * @param req - The request object to construct the URL.
 * @returns The URL of the saved file.
 */
export const saveFile = (fileBuffer: Buffer, originalName: string, folderPath: string, req: Request): string => {
    // Ensure the folder path exists
    const uploadPath = path.join(process.cwd(), folderPath);
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Create a unique filename
    const uniqueFilename = `user-${Date.now()}${path.extname(originalName)}`;
    const filePath = path.join(uploadPath, uniqueFilename);

    // Save the file
    fs.writeFileSync(filePath, fileBuffer);

    // Construct the file URL
    const fileURL = `${req.protocol}://${req.get('host')}/${folderPath.replace(/\\/g, '/')}/${uniqueFilename}`;

    return fileURL;
};

/**
 * USAGE EXAMPLE For Single File:
 * Route: router.post('/up/file', upload.single('photo'), userController.testUpload);
 * const file = req.file as Express.Multer.File;
 * const folder = 'uploads/photos'; const result = saveFile(file.buffer, file.originalname, folderPath, req)
 * 
 * Usage example for multiple files
 * Route: router.post('/up/file', upload.array('photo'), userController.testUpload);
 *  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Check file size condition first before proceeding with uploads
    const errors: string[] = [];

    // Check each file
    for (const file of files) {
      if (file.size > 10 * 1024) { // 10KB = 10 * 1024 bytes
        errors.push(`File ${file.originalname} exceeds 10KB, cannot be uploaded`);
      }
    }

    // If there are any errors, reject the upload and don't save any files
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Some files failed to upload',
        errors,
      });
    }

    // Array to store the URLs of successfully uploaded files
    const fileURLs: string[] = [];

    // If all files pass the size condition, proceed with the upload
    for (const file of files) {
      // Save the file and get its URL
      const folderPath = 'uploads/photos';
      try {
        const fileURL = saveFile(file.buffer, file.originalname, folderPath, req);
        fileURLs.push(fileURL);
      } catch (error: any) {
        errors.push(`Failed to upload file ${file.originalname}: ${error.message}`);
      }
    }

    // If there are still errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Some files failed to upload',
        errors,
      });
    }

    // Respond with success message if all files were uploaded successfully
    res.json({
      message: 'Files uploaded successfully',
      fileURLs,
    });

  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
 * 
 * // Check file type (only specific types are allowed)
const allowedMimes = [
  // Image MIME types
  'image/jpeg',    // JPG
  'image/png',     // PNG
  'image/gif',     // GIF
  'image/webp',    // WEBP
  'image/bmp',     // BMP
  'image/svg+xml', // SVG
  
  // Document MIME types
  'application/pdf',    // PDF
  'application/msword', // DOC
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/vnd.ms-powerpoint', // PPT
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
  'application/vnd.ms-excel', // XLS
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
  'text/plain', // TXT
  'text/csv',   // CSV
  'application/rtf',  // RTF
  
  // Audio MIME types
  'audio/mpeg',   // MP3
  'audio/wav',    // WAV
  'audio/ogg',    // OGG
  'audio/mp4',    // MP4 audio
  'audio/aac',    // AAC
  
  // Video MIME types
  'video/mp4',    // MP4
  'video/x-msvideo', // AVI
  'video/ogg',    // OGG video
  'video/webm',   // WebM
  'video/mkv',    // MKV
  
  // Archive/Compressed file MIME types
  'application/zip',      // ZIP
  'application/x-zip-compressed', // ZIP (another type)
  'application/x-rar-compressed', // RAR
  'application/x-tar',     // TAR
  'application/gzip',     // GZ
  'application/x-7z-compressed' // 7Z
];

if (!allowedMimes.includes(file.mimetype)) {
  return res.status(400).json({
    message: `Invalid file type. Allowed types are: ${allowedMimes.join(', ')}`
  });
}
*
*
* 
 * */ 