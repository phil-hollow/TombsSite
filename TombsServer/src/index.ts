import express from 'express';
import { Server } from 'http';
import { ServerHelper } from './ServerHelper';
import { FileUtills } from './Utills/FileUtills';

const app = express();

ServerHelper.SetUpServer(app);

FileUtills.getProductFilePath();

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})