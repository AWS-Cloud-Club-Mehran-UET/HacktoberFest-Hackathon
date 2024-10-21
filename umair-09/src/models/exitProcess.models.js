import mongoose from "mongoose";

const ExitProcessSchema = new mongoose.Schema({
    resignationSubmissionDate: {
      type: Date,
      required: true, // Date when the resignation was submitted
    },
    exitInterviewDate: {
      type: Date, // Date when the exit interview is scheduled
    },
    clearanceFormsStatus: {
      type: Boolean, // Whether clearance forms are completed or not
      default: false,
    },
    exitInterviewFeedback: {
      type: String, // Feedback provided during the exit interview
    }
  });
  
  const ExitProcess = mongoose.models.ExitProcess || mongoose.model('ExitProcess', ExitProcessSchema);
  