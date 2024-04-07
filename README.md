# NextJs Auth

This is a Next.js authentication with mongoDB

## Setup .env

```js
MONGOOSE_URI = 'mongooseURL'
DOMAIN = http://localhost:3000
JWT_SECRET = 'JWTsecret'

MAILTRAP_USER = ''
MAILTRAP_PASS = ''
```

or rename `.env.sample` to `.env`

signup to `cloud.mongodb.com` update `mongooseURL`
signup to `mailtrap.io` update `username` `password`

### run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Usage

### Signup

Input: `username` `email` `password`

### Login

Input: `email` `password`

### Forgot Password

Input: `email`
Receive reset Email with encripted token and link to reset password `valid` for 1 hour

### Profile

Output: `MongoId` `username` `email`

### reset

input: `password`
output: `update password`

ENJOY THE AUTH

### Developer: **Tayyab Riaz**

Website: [mrtayyabriaz.netlify.app](https://mrtayyabriaz.netlify.app/)

Github: [github/mrtayyabriaz](github.com/mrtayyabriaz)
