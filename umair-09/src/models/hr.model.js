import mongoose from "mongoose";
const HRAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true, 
  },
  role: {
    type: String,
    default: 'HR Admin', 
  }
  
}, {timestamps : true});

export const HRAdmin = mongoose.models?.HRAdmin || mongoose.model('HRAdmin', HRAdminSchema);


