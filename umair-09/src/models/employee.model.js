import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    employeeName: {
        type : String,
        required: true
    },
    employeeImage: {
        type : String,
    },
    employeeDesignation: {
        type : String,
        required: true
    },
    employeeDepartment: {type : Schema.Types.ObjectId, ref: 'Department', required: true },
    employeeSalary: {
        type : String,
        required: true
    },
    employeejoinDate: {
        type : String,
        required: true
    },
    employeePersonalEmail: {
        type : String,
        required: true
    },
    employeeOrganizationEmail: {
        type : String,
        required: true
    },
    employeePhoneNumber: {
        type : String,
        required: true
    },
    employeeAddress: {
        type : String,
        required: true
    },
  
}, {timestamps: true})

export const Employee = mongoose.models?.Employee || mongoose.model("Employee", EmployeeSchema)