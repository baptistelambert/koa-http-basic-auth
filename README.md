# koa-http-basic-auth

## Installation

npm

```
npm install --save koa-http-basic-auth
```

yarn
```
yarn add koa-http-basic-auth
```

## Usage

```js
const Koa = require('koa');
const basicAuth = require('koa-http-basic-auth');

const app = new Koa();

// Register koa-http-basic-auth middleware
app.use(basicAuth({
  user: 'username', // required
  pass: 'password', // required
  realm: 'Authorization', // optional, defaults to 'Authorization required'
}));

// Protected response
app.use(async (ctx) => {
  ctx.status(200);
  ctx.body = 'Protected';
});

app.listen(3000);
```
