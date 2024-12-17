import { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployeeForm from './AddEmployeeForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, MinusCircle, Trash2, RefreshCcw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminPanel = ({ onLogout, userRole }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Failed to fetch employees.');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteEmployee = async (employeeId) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/employees/delete/${employeeId}`);
            setEmployees(employees.filter((employee) => employee.employeeId !== employeeId));
            alert('Employee deleted successfully!');
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Failed to delete the employee. Please try again.');
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
                    <div className="flex space-x-4">
                        <Button onClick={() => setIsAdding(!isAdding)} variant="outline">
                            {isAdding ? (
                                <>
                                    <MinusCircle className="mr-2 h-4 w-4" />
                                    Hide
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Employee
                                </>
                            )}
                        </Button>
                        <Button onClick={onLogout} variant="destructive">
                            Logout
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                {isAdding && (
                    <div className="mb-6">
                        <AddEmployeeForm />
                    </div>
                )}
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Employee List</h3>
                        <Button onClick={fetchEmployees} variant="outline" size="sm">
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                    {isLoading ? (
                        <p>Loading employees...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Employee ID</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Role</TableHead>
                                    {['admin', 'owner'].includes(userRole) && (
                                    <TableHead>Actions</TableHead>
                                        )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.employeeId}>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.employeeId}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{employee.role}</TableCell>
                                        <TableCell>
                                            {['admin', 'owner'].includes(userRole) && (
                                                <Button
                                                    onClick={() => deleteEmployee(employee.employeeId)}
                                                    variant="destructive"
                                                    size="sm"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPanel;
