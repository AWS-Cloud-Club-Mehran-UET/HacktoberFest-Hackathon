import { Employee } from '../models/employee.js';

export const createEmployee = async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
};

export const getEmployees = async (req, res) => {
    const employees = await Employee.find().populate('department');
    res.json(employees);
};

// getAllEmployees
export const getAllEmployees = async (req, res) => {
    const employees = await Employee.find().populate('department').populate('queries');
    res.json(employees);
};

export const updateEmployee = async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
};

export const deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send();
};
