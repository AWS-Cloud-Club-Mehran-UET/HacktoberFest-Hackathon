import mongoose, { Schema } from "mongoose";

const onBoardingTaskSchema = new mongoose.Schema({
   employee :{type : Schema.Types.ObjectId, ref: "EmployeeSchema", required: true },
   depatment : {type : Schema.Types.ObjectId, ref: "DepartmentSchema", required: true },
 
}, {timestamps: true} )

export const onBoardingTask = mongoose.model.onBoardingTask || mongoose.models("onBoardingTaskSchema")