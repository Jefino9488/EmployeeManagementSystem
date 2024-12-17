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
router.get('/', (req, res) => {
    db.query('SELECT id, name, employeeId, email, department, role FROM employees', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error.', details: err });
        return res.status(200).json(results);
    });
});

router.post('/add', (req, res) => {
    const { name, employeeId, email, phone, department, dateOfJoining, role, password } = req.body;

    db.query('SELECT * FROM employees WHERE employeeId = ? OR email = ?', [employeeId, email], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length > 0) return res.status(400).json({ error: 'Employee ID or Email already exists.' });

        const query = 'INSERT INTO employees (name, employeeId, email, phone, department, dateOfJoining, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [name, employeeId, email, phone, department, dateOfJoining, role, password], (err, results) => {
            if (err) return res.status(500).json({ error: err });
            return res.status(201).json({ message: 'Employee added successfully!' });
        });
    });
});

router.delete('/delete/:employeeId', (req, res) => {
    const { employeeId } = req.params;

    db.query('SELECT * FROM employees WHERE employeeId = ?', [employeeId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ error: 'Employee not found.' });

        db.query('DELETE FROM employees WHERE employeeId = ?', [employeeId], (err, results) => {
            if (err) return res.status(500).json({ error: err });
            return res.status(200).json({ message: 'Employee deleted successfully!' });
        });
    });
});

export default router;