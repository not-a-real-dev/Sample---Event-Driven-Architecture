import express from 'express';
import cors from 'cors'
import './events/listeners';
import router from './routes/unlock';

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', router);

app.listen(3001, () => {
    console.log('Running on port 3001');
});