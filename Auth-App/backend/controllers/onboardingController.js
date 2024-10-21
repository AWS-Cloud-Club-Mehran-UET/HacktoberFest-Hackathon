import { Onboarding } from '../models/onboardingModel.js';

export const createOnboardingTask = async (req, res) => {
    const onboarding = new Onboarding(req.body);
    await onboarding.save();
    res.status(201).json(onboarding);
};

export const getOnboardingTasks = async (req, res) => {
    const onboardingTasks = await Onboarding.find().populate('employeeId');
    res.json(onboardingTasks);
};

export const updateOnboardingStatus = async (req, res) => {
    const onboarding = await Onboarding.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(onboarding);
};
