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
```javascript
npm start
```
1. Now project will run in following port
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
2. If you want to delete any module , just delete the module form `src/app/modules/moduleName` and also delete the route from `app.ts` file. Find this part by following the bellow comment line in `app.ts` file.
```js
/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/
   you will get routes in this part, you have to remove it else you will get an error.
/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/
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