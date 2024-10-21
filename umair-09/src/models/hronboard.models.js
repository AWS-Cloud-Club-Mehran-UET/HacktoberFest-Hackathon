import mongoose, { Schema } from "mongoose";

const HROnBoardSchema = new mongoose.Schema({
    employeeName: {
        type : String,
        required: true
    },
    employeeImage: {
        type : String,
    },
    employeePersonalEmail: {
        type : String,
        required: true
    },
    interViewDate : {
        type: Date,
        required: true
    },
    document: {
        type: String,
        required: true,
    },
    employeePhoneNumber: {
        type : String,
        required: true
    },
    employeeAddress: {
        type : String,
        required: true
    },
  
  
}, {timestamps: true} )

export const HROnBoard = mongoose.model.HROnBoard || mongoose.models("HROnBoardSchema")