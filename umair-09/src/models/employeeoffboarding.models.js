const mongoose = require('mongoose');

const EmployeeOffboardingFormSchema = new mongoose.Schema({
    employee: { type: Schema.Types.ObjectId, ref: "EmployeeSchema", required: true },
    terminationDate: {
        type: Date,
        required: true, // Date when termination is effective
    },
    resignationReason: {
        type: String,
        enum: ['Personal', 'New Opportunity', 'Relocation', 'Retirement', 'Termination', 'Other'], // Predefined resignation reasons
        required: true,
    },
    autoPopulatedFields: {
        type: Map,
        of: String, // Example: { "managerName": "John Doe", "hireDate": "2020-05-15" }
    }
});

const EmployeeOffboardingForm = mongoose.models.EmployeeOffboardingForm || mongoose.model('EmployeeOffboardingForm', EmployeeOffboardingFormSchema);
