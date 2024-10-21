import { Query } from '../models/queryModel.js';

export const submitQuery = async (req, res) => {
    const { employeeId, queryText } = req.body;
    const newQuery = new Query({ employeeId, queryText });
    await newQuery.save();
    res.status(201).json(newQuery);
};

export const getQueries = async (req, res) => {
    const queries = await Query.find().populate('employeeId');
    res.json(queries);
};

export const updateQuery = async (req, res) => {
    const query = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(query);
};
