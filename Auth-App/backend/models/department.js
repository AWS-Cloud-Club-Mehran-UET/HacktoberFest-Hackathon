import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  chairman: { type: String, required: true },
  dean: { type: String, required: true },
}, { timestamps: true });

export const Department = mongoose.model('Department', departmentSchema);
