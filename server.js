import express, { json } from 'express';
import index from './routes/index.js';

const app = express();
app.use(json());

app.use('', index); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(` server running on port ${port}`);
});

export default app;