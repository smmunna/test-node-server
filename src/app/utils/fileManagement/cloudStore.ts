import multer from "multer";


//==================Set up Multer for file handling Uploading to CloudStore=================
const storage = multer.memoryStorage(); // Store files in memory
const cloudStore = multer({ storage });

export default cloudStore;