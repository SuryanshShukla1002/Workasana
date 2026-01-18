import Task from '../models/task.model.js';

export const lastWeekReport = async (req, res, next) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const getAllTaskFinished = Task.find({
            status: "Completed",
            updatedAt: { $gte: sevenDaysAgo }
        });
        if (getAllTaskFinished) {
            res.status(200).json(getAllTaskFinished);
        } else {
            res.status(404).json({ message: "Unable to fetch the last report week" });
        }
    } catch (error) {
        next(error);
    }
};
