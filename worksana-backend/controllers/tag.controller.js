import Tag from '../models/tag.models.js';


export const addNewTags = async (req, res, next) => {
    try {
        const addTags = await Tag.create(req.body);
        res.status(201).json(addTags);
    } catch (error) {
        next(error);
    }
};

export const fetchAllTags = async (req, res, next) => {
    try {
        const getAllTags = await Tag.find();
        res.status(200).json(getAllTags);
    } catch (error) {
        next(error);
    }
};