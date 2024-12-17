CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    employeeId VARCHAR(10) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(10) NOT NULL,
    department VARCHAR(50) NOT NULL,
    dateOfJoining DATE NOT NULL,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
    );

INSERT INTO employees (name, employeeId, email, phone, department, dateOfJoining, role, password)
VALUES
    ('Jefino', 'Jefino9488', 'jefinojacob9488@gmail.com', '8220934327', 'Engineering', '2024-06-15', 'Software Engineer', 'Jefino@1537');
