//import { env } from 'process';
 //import express from 'express';

import express, { json } from 'express';

//const routes = require('./routes/index');

const routes = import('./routes/index.js');

const app = express();

// const port = env.PORT || 5000;

const port = process.env.PORT || 3000;
app.use(json());

//app.use(routes);
// app.listen(port, '127.0.0.1');

app.listen(port, () => {
  console.log(` server running on port ${port}`);
});

export default app;