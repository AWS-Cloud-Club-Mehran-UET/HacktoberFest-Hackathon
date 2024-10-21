import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Model({
    departmentNumber: {
        type : Number,
        required: true
    },
    departmentName: {
        type : String,
        required: true
    },
    departmentChairman: {
        type : String,
        required: true
    },
    departmentDean: {
        type : String,
        required: true
    },
    departmentLocation: {
        type : String,
        required: true
    },
    employees : [{type : Schema.Types.ObjectId, ref: 'Employee', required: true }]
})

export const Department = mongoose.models?.Department || mongoose.model("Department", DepartmentSchema)