import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/mongodb/index.js';
import { errorHandler } from './middlewares/ErrorHandlerMiddleware.js';
import { apiRouter } from './routes/index.js';
import cors from 'cors';

await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(errorHandler);
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    if (process.env.ENV === 'PROD') {
        app.use(express.static(path.join(__dirname, '../frontend/dist')));
        return res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'));
    }
    const FRONT_END_URI = `${process.env.SERVER_URI}:${process.env.FRONT_END_PORT}`;
    return res.send(`Your app is currently set to the DEV environment. Please switch it to PROD to access the frontend, or you can directly visit the frontend at: <a target="_blank" href="${FRONT_END_URI}">${FRONT_END_URI}</a>`)
});

app.listen(PORT, () => {
    console.log(`⚡Server is running on port ${PORT}`);
})
