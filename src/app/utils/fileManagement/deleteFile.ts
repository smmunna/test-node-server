import path from 'path'
import fs from 'fs'

const deleteFile = (filename: string, callback: (error: Error | null, message?: string) => void) => {

    const filePath = path.join(__dirname, '..', '..', '..','..', 'uploads', filename);
    // console.log(filePath);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                callback(err, 'Failed to delete the file.');
            } else {
                callback(null, 'File deleted successfully.');
            }
        });
    } else {
        callback(new Error('File not found.'));
    }
}

export default deleteFile;
