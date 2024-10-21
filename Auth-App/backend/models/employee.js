import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  salary: { type: Number, required: true },
  personalEmail: { type: String },
  organizationEmail: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  address: { type: String },
}, { timestamps: true });

export const Employee = mongoose.model('Employee', employeeSchema);
