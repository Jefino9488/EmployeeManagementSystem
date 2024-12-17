import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/signin', (req, res) => {
    const { employeeId, password } = req.body;
    db.query('SELECT * FROM employees WHERE employeeId = ? AND password = ?', [employeeId, password], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length > 0) return res.status(200).json({ message: 'Sign-in successful!' });
        return res.status(401).json({ error: 'Invalid credentials.' });
    });
});


export default router;