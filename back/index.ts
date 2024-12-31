import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import mongoDb from './mongoDb';
import linksRouter from './routers/links';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/links', linksRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/urls');

  app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoDb.disconnect();
  });
};

run().catch((err) => console.log(err));
