-- Create the 'employees' table
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

-- Insert an example employee record
INSERT INTO employees (name, employeeId, email, phone, department, dateOfJoining, role, password)
VALUES
    ('John Doe', 'EMP001', 'john.doe@example.com', '1234567890', 'Engineering', '2024-06-15', 'Software Engineer', 'securepassword123');
