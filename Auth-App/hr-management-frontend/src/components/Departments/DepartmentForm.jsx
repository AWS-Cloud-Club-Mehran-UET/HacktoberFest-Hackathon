import React, { useState } from 'react';
import { createDepartment } from '../../api';

const DepartmentForm = () => {
    const [name, setName] = useState('');
    const [chairman, setChairman] = useState('');
    const [dean, setDean] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDepartment({ name, chairman, dean });
            alert('Department created!');
            setName('');
            setChairman('');
            setDean('');
        } catch (error) {
            console.error(error);
            alert('Failed to create department!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Department</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Department Name"
                required
            />
            <input
                type="text"
                value={chairman}
                onChange={(e) => setChairman(e.target.value)}
                placeholder="Chairman Name"
                required
            />
            <input
                type="text"
                value={dean}
                onChange={(e) => setDean(e.target.value)}
                placeholder="Dean Name"
                required
            />
            <button type="submit">Add Department</button>
        </form>
    );
};

export default DepartmentForm;
