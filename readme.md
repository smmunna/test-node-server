## Node.js Server Starter Template

### Installation Process
1. Run the following command
```javascript
npx nodeexpressjs
```
2. Create a new database in MongoDB Compass or MongoDB Cloud Storage
3. Then update `.env` file `DATABASE_URL`, Default name given `nextjs` change it whatever you want.
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
   
6. Goto this project directory & open `two` terminal
```javascript
npx tsc --w
```
```javascript
npm start
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

### New Features
   - Server created with Node, Express, TypeScript (JS)

### Installed packages (NPM)
   - "cors"
   - "dotenv"
   - "express"
   - "jsonwebtoken"
   - "mongoose"
   - "nodemon"
   - "typescript"
   - "multer"
   - "sslcommerze"
   - "paypal": maybe not supported
   - "bcrypt"
   - "nodemailer"
   - "helmet"
   - "axios"
   - "imgbb"
   - "cloudinary"

### Folder Structures
   - `dist` > compiled the src folder all files
   - `src` > contains all the important folders
   - `app` > contains middleware, modules, utils
   - `app.ts`> base of the application
   - `server.ts`> server configuration here
   - `utils.ts`> contains important functions

  #### Thank you
  2024&copy; Developed by <a href="https://github.com/smmunna">smmunna</a>