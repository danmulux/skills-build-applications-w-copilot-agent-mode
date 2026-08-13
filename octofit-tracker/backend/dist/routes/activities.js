"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find()
            .populate('userId', 'username email')
            .sort({ activityDate: -1 });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// Get activities by user
router.get('/user/:userId', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find({ userId: req.params.userId })
            .sort({ activityDate: -1 });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user activities' });
    }
});
// Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findById(req.params.id).populate('userId', 'username email');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// Create activity
router.post('/', async (req, res) => {
    try {
        const { userId, type, duration, distance, caloriesBurned, pace, location, notes, activityDate, } = req.body;
        if (!userId || !type || !duration || !distance || !activityDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const activity = new Activity_1.Activity({
            userId,
            type,
            duration,
            distance,
            caloriesBurned,
            pace,
            location,
            notes,
            activityDate,
        });
        await activity.save();
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});
// Update activity
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update activity' });
    }
});
// Delete activity
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
exports.default = router;
