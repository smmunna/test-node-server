## Node.js Server Starter Template

### New Features
   - Server created with Node, Express, TypeScript (JS)

### Installed packages (NPM)
   - "cors": "^2.8.5"
   - "dotenv": "^16.4.5"
   - "express": "^4.18.3"
   - "jsonwebtoken": "^9.0.2"
   - "mongoose": "^8.2.1"
   - "nodemon": "^3.1.0"
   - "typescript": "^5.4.2"
   - "multer": "^1.4.5-lts.1"

### Folder Structures
   - `dist` > compiled the src folder all files
   - `src` > contains all the important folders
   - `app` > contains middleware, modules, utils
   - `app.ts`> base of the application
   - `server.ts`> server configuration here
   - `utils.ts`> contains important functions

### How to setup the server

   - Clone this server
  ```javascript
    git clone https://github.com/smmunna/node-server-starter.git
  ```
   - Goto this project directory `cd node-server-starter`
   - Intall the required packages in `package.json`
  ```javascript
    npm install
  ```
  - Open `2 terminal` in vs code or in command prompt
  - Setup your Local MongoDB server or Online MongoDB server [Visit Here](https://account.mongodb.com/account/login)
    - Create a database name `nextjs` or `anyother name`
    - Create a table name `users` or `anyother name`
  - `.env` open this file, and configure it
  - Use the commad to run the server
  ```javascript
    npx tsc --w
  ```
  ```javascript
    npm start
  ```
 - Remove the main authorization from github
  ```javascript
       git remote rm origin
  ```

  #### Thank you
  2024&copy; Developed by <a href="https://github.com/smmunna">smmunna</a>