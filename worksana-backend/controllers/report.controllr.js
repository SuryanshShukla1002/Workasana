import Task from '../models/task.model.js';

// GET /report/last-week - Fetch tasks completed in the last week
export const lastWeekReport = async (req, res, next) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const getAllTaskFinished = await Task.find({
            status: "Completed",
            updatedAt: { $gte: sevenDaysAgo }
        })
            .populate('project', 'name')
            .populate('team', 'name')
            .populate('owners', 'name');

        if (getAllTaskFinished.length > 0) {
            res.status(200).json({
                success: true,
                count: getAllTaskFinished.length,
                tasks: getAllTaskFinished
            });
        } else {
            res.status(200).json({
                success: true,
                count: 0,
                message: "No tasks completed in the last week",
                tasks: []
            });
        }
    } catch (error) {
        next(error);
    }
};

// GET /report/pending - Fetch total days of work pending for all tasks
export const pendingReport = async (req, res, next) => {
    try {
        const pendingTasks = await Task.find({
            status: { $ne: "Completed" }
        })
            .populate('project', 'name')
            .populate('team', 'name')
            .populate('owners', 'name');

        const totalPendingDays = pendingTasks.reduce((total, task) => {
            return total + (task.timeToComplete || 0);
        }, 0);

        res.status(200).json({
            success: true,
            totalPendingDays,
            totalPendingTasks: pendingTasks.length,
            tasks: pendingTasks
        });
    } catch (error) {
        next(error);
    }
};

export const closedTasksReport = async (req, res, next) => {
    try {
        const { groupBy } = req.query; // ?groupBy=team OR ?groupBy=owner OR ?groupBy=project

        const completedTasks = await Task.find({
            status: "Completed"
        })
            .populate('project', 'name')
            .populate('team', 'name')
            .populate('owners', 'name');

        let report = {};

        if (groupBy === 'team') {
            // Group by team
            report = completedTasks.reduce((acc, task) => {
                const teamName = task.team?.name || 'Unassigned';
                if (!acc[teamName]) {
                    acc[teamName] = {
                        count: 0,
                        tasks: []
                    };
                }
                acc[teamName].count++;
                acc[teamName].tasks.push({
                    id: task._id,
                    name: task.name,
                    timeToComplete: task.timeToComplete
                });
                return acc;
            }, {});

        } else if (groupBy === 'owner') {
            report = completedTasks.reduce((acc, task) => {
                if (task.owners && task.owners.length > 0) {
                    task.owners.forEach(owner => {
                        const ownerName = owner.name || 'Unassigned';
                        if (!acc[ownerName]) {
                            acc[ownerName] = {
                                count: 0,
                                tasks: []
                            };
                        }
                        acc[ownerName].count++;
                        acc[ownerName].tasks.push({
                            id: task._id,
                            name: task.name,
                            timeToComplete: task.timeToComplete
                        });
                    });
                } else {
                    if (!acc['Unassigned']) {
                        acc['Unassigned'] = {
                            count: 0,
                            tasks: []
                        };
                    }
                    acc['Unassigned'].count++;
                    acc['Unassigned'].tasks.push({
                        id: task._id,
                        name: task.name,
                        timeToComplete: task.timeToComplete
                    });
                }
                return acc;
            }, {});

        } else if (groupBy === 'project') {
            // Group by project
            report = completedTasks.reduce((acc, task) => {
                const projectName = task.project?.name || 'Unassigned';
                if (!acc[projectName]) {
                    acc[projectName] = {
                        count: 0,
                        tasks: []
                    };
                }
                acc[projectName].count++;
                acc[projectName].tasks.push({
                    id: task._id,
                    name: task.name,
                    timeToComplete: task.timeToComplete
                });
                return acc;
            }, {});

        } else {
            return res.status(200).json({
                success: true,
                totalCompletedTasks: completedTasks.length,
                message: "Use ?groupBy=team, ?groupBy=owner, or ?groupBy=project to group results",
                tasks: completedTasks
            });
        }

        res.status(200).json({
            success: true,
            groupedBy: groupBy,
            totalCompletedTasks: completedTasks.length,
            report
        });

    } catch (error) {
        next(error);
    }
};