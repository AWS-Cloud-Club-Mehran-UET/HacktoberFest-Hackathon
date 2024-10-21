import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    queryText: { type: String, required: true },
    status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
    response: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export const Query = mongoose.model('Query', querySchema);
