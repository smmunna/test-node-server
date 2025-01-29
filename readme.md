## Node-Express Server Starter Template

### Installation Process

1. Run the following command
```javascript
npx node-expressx
```
2. Create a new database in MongoDB Compass or MongoDB Cloud Storage
3. Then update  name `example.env` to `.env`. Goto this `.env` file `DATABASE_URL`, Default name given `nextjs` change it whatever you want.
4. You can add local and also cloud for production level.
5. Then create a new table name `users`, contain following fields.
   ```javascript
   {
      "username": "",
      "email": "",
      "password": "",
      "role": ""
   }
   ```
   *You can open `postman` and paste this api endpoint into the url section*
   ```javascript   
      http://localhost:5000/api/v1/users
   ```
   After that select `body` and also `json` as format and paste that object, used `bcrypt` to encrypt password
    ```javascript
   {
      "username": "Minhazul Abedin Munna",
      "email": "munna@gmail.com",
      "password": "1234",
      "role": "admin"
   }
   ```
   Now select `POST` method and hit `send` button, It will successfully create a user.
   
6. Goto this project directory & open terminal
```bash
npm run start:dev
```
7. Now project will run in following port
```javascript   
http://localhost:5000
```
**API Endpoints**
```javascript   
http://localhost:5000/api/v1/
```
```javascript   
http://localhost:5000/api/v1/users
```
### Instructions
1. Create any module by this command
```bash
npm run create-module moduleName
```
**Deleting a Module by following this command**
```bash
npm run delete-module moduleName
```
2. If you want to delete any module , just delete the module form `src/app/modules/moduleName` and also delete the route from `src/app/routes/index.ts` file.
### Deploy 
3. Just run the following command, This will generate the `dist` directory. Which you can deploy to the server.
```bash
npm run build
```
4. After getting the `dist` directory, you can run the following command
```bash
npm run start:prod
```
You can check whether your project is working perfectly for the production level or not.
### Features
1. File upload configured with Multer, cloudinary, imgbb
2. Payment gateway configured with sslcommerze, paypal & stripe
3. Organized file with modular approach (controller, service, route, interface)
4. Socket.io configured for real time communication
5. MongoDB configured
6. Mail Server configured with Node Mailer
7. Query Builder configured

### File Uploading Process
1. Make a route this way:
```js
import multer from 'multer';
// File uploading configuration..
const upload = multer()

router.post('/up/file', upload.single('photo'), userController.testUpload); //single file upload
router.post('/up/file', upload.array('photo'), userController.testUpload); //multiple file upload
router.post('/up/file', upload.array('photo',10), userController.testUpload); //specific limit file upload
```
2. Controller methods will be this way:
```js
const testUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Check file size condition first before proceeding with upload
    if (file.size > 10 * 1024) { // 10KB = 10 * 1024 bytes
      return res.status(400).json({ message: `File ${file.originalname} exceeds 10KB, cannot be uploaded` });
    }

    // Check file type (only jpg and png are allowed)
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (!allowedMimes.includes(file.mimetype)) {
      return res.status(400).json({ message: `Invalid file type. Only JPG and PNG files are allowed.` });
    }

    // Save the file and get its URL
    const folderPath = 'absk/ads';
    let fileURL: string;
    try {
      fileURL = saveFile(file.buffer, file.originalname, folderPath, req);
    } catch (error: any) {
      return res.status(500).json({
        message: `Failed to upload file ${file.originalname}: ${error.message}`,
      });
    }

    // Respond with success message if file is uploaded successfully
    res.json({
      message: 'File uploaded successfully',
      fileURL,
    });

  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }

};
```
3. For uploading multiple files, then follow this process
```js
try {
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
```
4. Mime types are available
```js
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
```
5. Deleting the file
```javascript
// File Deleting
const deleteFileData = async (req: Request, res: Response) => {
  /*
    When you want to delete any product or delete any user information with their photo or other files.
    This deleting method will help you.
    Just fetch the data from database then you will get photo url. just pass this url to parsedURL() method, then
    deleteFastFile() will delete the file
    */
  // ===============DELETE LOCAL FILE============
  const path = 'http://localhost:5000/uploads/user-1728138253071.png'
  const urlconversion = parsedURL(path) // convert into uploads/user-1728138253071.png like this
  if (urlconversion) {
      deleteFastFile(urlconversion) // takes the file path as parameter, uploads/user-3843.png and delete it.
      sendApiResponse(res, 200, true, 'Deleted file successfully')
  }
  else {
      console.log('Not Deleted, Try again later')
  }
  // ===============END OF DELETING LOCAL FILE============
};
```


### Query Building for local database
1. Create , Read, Update and Delete
```javascript
// Create one data or multiple data both will works, you can use insertMany for this also.
// Must use try catch block
 try {
    // Data to be inserted
    const data = req.body;
    // Insert the user into the 'users' collection
    const newUser = await insertOne('users', data);
  } catch (error) {
  }

// Finding data..
const result = await findAll('users');
const result = await findAll('users',{name:'munna'},{password:0},{sortField:'',sortOrder:'asc'});

// Example 1: Get the first page with a limit of 10 results, filtered by 'age' = 25, sorted by 'name' in ascending order
const result = await paginate("persons", { age: 25 }, { password: 0 }, { page: 1, limit: 10, sortField: "name", sortOrder: "asc" });

const result = await findOne('users',{id}); //based on query parameters or route parameter also
const result = await findOne('users',{id},{password:0}); //exclude any fields

// Aggregate Functions
const minAge = await min("users", "age", { salary: "4000" }, { password: 0 });
const maxSalary = await max("users", "salary", { age: "25" }, { email: 0 });
const totalUsers = await count("users", { name: "Alice" }, { password: 0 });
const totalSalaries = await sum("users", "salary", { age: "30" }, { phone: 0 });
const avgSalary = await avg("users", "salary", {}, { email: 0 });
const result = await search("users", { name: { $regex: "af" } }); //searching
// join query
const ordersWithProducts = await join(
    "orders", 
    { 
        from: "products", 
        localField: "product_id", 
        foreignField: "_id", 
        as: "orderdetails" 
    },
    { status: "confirmed" }, // Filter by confirmed orders
    { "orderdetails.price": 0 } // Exclude product price
);

// Join with Paginations
const result = await join(
    "persons", 
    { 
        from: "user", 
        localField: "age", 
        foreignField: "age", 
        as: "orderdetails" 
    },
    {}, // No query filter
    { password: 0 }, // Exclude `password` from BOTH `persons` and `user`
    { page: 2, limit: 5 } // **Pagination: Page 2, 5 results per page**
);

console.log(result);


```

### Contributor ✨

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center">
        <a href="https://github.com/smmunna">
            <img src="https://avatars.githubusercontent.com/u/64527538?v=4" width="100px;" alt=""/><br />
            <sub><b>Minhazul Abedin Munna</b></sub>
        </a><br />
    </td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

### Thank you
  2024-2025&copy; Developed by <a href="https://github.com/smmunna">smmunna</a>