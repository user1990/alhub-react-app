# Adventurers League Hub React Application

### Server Side

* Node/Express API Setup
* Server-Side Validation
* MongoDB/Mongoose
* JSON Web Tokens
* Bcrypt

### Client Side

* React
* Redux
* React-Router v4
* Redux-Form
* Redux-Thunk
* HMR (Hot-Module-Replacement)
* Internationalisation with React-Intl

### Setup

```bash
$ git clone https://github.com/user1990/alhub-react-app.git
```

then checkout the branch as follow

```bash
$ git checkout 'branch_name'
```

after checkout be sure to run

```bash
$ npm install
```

installing using yarn

```bash
$ yarn install
```

Add dev.js file in server/api/config directory, example:

```bash
module.exports = {
  MONGO_DB_URI: 'YOUR_MONGODB_URL',
  JWT_SECRET: 'YOUR_RANDOM_JWT_SECRET',
  EMAIL_HOST: 'YOUR_MAILTRAP_HOST',
  EMAIL_PORT: 2525,
  EMAIL_USER: 'YOUR_MAILTRAP_USER',
  EMAIL_PASS: 'YOUR_MAILTRAP_PASSWORD',
};
```

To run the project use

```bash
$ npm run start-dev
```

starting the project using yarn

```bash
$ yarn start-dev
```
