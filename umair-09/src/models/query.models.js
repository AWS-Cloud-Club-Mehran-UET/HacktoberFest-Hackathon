import mongoose, { Schema } from "mongoose";

const QuerySchema = new mongoose.Schema({
    queryBy:{type : Schema.Types.ObjectId, ref: "Employee", required: true },
    queryTo: {type : Schema.Types.ObjectId, ref: "HRAdmin", required: true },
    content: {
        type : {String, required : true},
    },
    pending : {
        type: Boolean,
        default: true
    },
  
}, {timestamps: true} )

export const Query = mongoose.models?.Query || mongoose.model("Query", QuerySchema)