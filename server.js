//import express, { json } from 'express';
import express from 'express';
import index from './routes/index.js';

// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:');
//   // Handle the exception or log it as needed
//   //process.exit(1); // Optionally, exit the process
// });

const app = express();
app.use(express.static('public'))
app.use(express.json());

app.use('', index); 

const port = process.env.PORT || 3000;

app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .send({ message: err.message, stack: err.stack });
});
app.listen(port, () => {
  console.log(`dev server running on port ${port}`);
});

export default app;