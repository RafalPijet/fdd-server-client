import express from 'express';

const app = express();

app.listen(3001, (): void => {
    console.log('Server started at port 3001');
})