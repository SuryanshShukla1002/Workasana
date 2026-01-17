import Project from '../models/project.models.js';

export const newProject = async (req, res, next) => {
    try {
        const createProject = await Project.create(req.body);
        res.status(201).json(createProject);
    } catch (error) {
        next(error);
    }
};

export const getAllProject = async (req, res, next) => {
    try {
        const allProject = await Project.find();
        res.status(200).json(allProject);
    } catch (error) {
        next(error);
    }
};