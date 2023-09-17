import express, { json } from 'express';

//const home = import('./routes/index.js');

import index from './routes/index.js';

const app = express();

app.use('', index); 

const port = process.env.PORT || 3000;
app.use(json());

app.listen(port, () => {
  console.log(` server running on port ${port}`);
});

export default app;