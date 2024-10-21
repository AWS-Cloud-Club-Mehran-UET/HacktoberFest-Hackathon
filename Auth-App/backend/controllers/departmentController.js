import { Department } from '../models/department.js';

export const createDepartment = async (req, res) => {
    const { number, name, chairman, dean } = req.body;
    const department = new Department({ number, name, chairman, dean });
    await department.save();
    res.status(201).json(department);
};

export const getDepartments = async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
};

// getAllDepartments
export const getAllDepartments = async (req, res) => {
    const departments = await Department.find().populate('courses');
    res.json(departments);
};

export const updateDepartment = async (req, res) => {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(department);
};

export const deleteDepartment = async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204).send();
};
