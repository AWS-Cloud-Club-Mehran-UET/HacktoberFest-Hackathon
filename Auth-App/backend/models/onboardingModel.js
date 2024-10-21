import mongoose from 'mongoose';

const onboardingSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    tasks: [{ type: String }],
    completed: { type: Boolean, default: false }
});

export const Onboarding = mongoose.model('Onboarding', onboardingSchema);
