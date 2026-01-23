import Team from '../models/team.models.js';


export const createTeam = async (req, res, next) => {
    try {
        const teamCreation = await Team.create(req.body);
        res.status(201).json(teamCreation);
    } catch (error) {
        next(error);
    }
};

export const allTeamsGet = async (req, res, next) => {
    try {
        const getTeam = await Team.find();
        res.status(200).json(getTeam);
    } catch (error) {
        next(error);
    }
};