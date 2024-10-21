import React, { useEffect, useState } from 'react';
import { getDepartments } from '../../api';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments();
                setDepartments(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div>
            <h2>Departments</h2>
            <ul>
                {departments.map((department) => (
                    <li key={department.id}>{department.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
