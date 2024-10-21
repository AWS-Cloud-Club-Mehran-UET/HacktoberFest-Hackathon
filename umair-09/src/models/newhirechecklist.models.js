

import mongoose, { Schema } from "mongoose";

const NewCheckListSchema = new mongoose.Schema({
   employee:{type : Schema.Types.ObjectId, ref: "EmployeeSchema", required: true },
   documentSubmissionStatus:{
    type : Boolean,
    default : false,
    required: true
    },
    orientationScheduled:  {
        type : Boolean,
        required: true,
    }
  
}, {timestamps: true} )

export const NewHireCheckList = mongoose.model.NewHireCheckList || mongoose.models("NewHireCheckList", NewCheckListSchema)