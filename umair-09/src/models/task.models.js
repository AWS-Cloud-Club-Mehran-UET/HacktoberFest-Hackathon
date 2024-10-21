
import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
   employee:{type : Schema.Types.ObjectId, ref: "EmployeeSchema", required: true },
   department:{type : Schema.Types.ObjectId, ref: "DepartmentSchema", required: true },
   taskDescription: {
    type : String,
    required: true
   },
   ITSetupStatus : {
    type: Boolean,
    default : true
   },
   facilityManagementStatus:  {
    type: Boolean,
    default : true
   },

  taskDueDate:{
    type: Date,
    require : true
  }
}, {timestamps: true} )

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
