import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import employeeRoutes from './routes/employees.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});