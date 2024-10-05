import multer from 'multer'
import path from 'path'

// =============FOR UPLOADING LOCALLY========================

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/')
//     },
//     filename: (req, file, cb) => {
//         const fileExt = path.extname(file.originalname)
//         const filename = file.originalname
//             .replace(fileExt, "")
//             .toLowerCase()
//             .split(" ")
//             .join("-") + "-" + Date.now()

//         cb(null, filename + fileExt)
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1000000 //1 MB
//     },
//     fileFilter: (req, file, cb) => {
//         if (file.fieldname === 'photo') {
//             if (
//                 file.mimetype === 'image/jpeg' ||
//                 file.mimetype === 'image/png' ||
//                 file.mimetype === 'image/jpg'
//             ) {
//                 cb(null, true)
//             }
//             else {
//                 cb(new Error("Only jpg,jpeg or png is allowed"))
//             }
//         }

//         // For pdf
//         // else if (file.fieldname === 'doc') {
//         //     if (
//         //         file.mimetype === 'application/pdf'
//         //     ) {
//         //         cb(null, true)
//         //     }
//         //     else {
//         //         cb(new Error("Only .pdf is allowed"))
//         //     }
//         // }

//         else {
//             cb(new Error("There was unknown error"))
//         }
//     },
// })
// ------------------END OF UPLOADING LOCAL SERVER--------------------------------------


//==================Set up Multer for file handling Uploading to Imgbb=================
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

export default upload;