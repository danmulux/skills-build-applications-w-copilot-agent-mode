"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
// Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.Team.find()
            .populate('owner', 'username email')
            .populate('members', 'username email');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findById(req.params.id)
            .populate('owner', 'username email')
            .populate('members', 'username email');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// Create team
router.post('/', async (req, res) => {
    try {
        const { name, description, ownerId } = req.body;
        if (!name || !ownerId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const team = new Team_1.Team({
            name,
            description,
            owner: ownerId,
            members: [ownerId],
        });
        await team.save();
        await team.populate('owner', 'username email');
        res.status(201).json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});
// Add member to team
router.post('/:id/members', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'Missing userId' });
        }
        const team = await Team_1.Team.findByIdAndUpdate(req.params.id, { $addToSet: { members: userId } }, { new: true }).populate('members', 'username email');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add member to team' });
    }
});
// Update team
router.put('/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update team' });
    }
});
// Delete team
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findByIdAndDelete(req.params.id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: 'Team deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
exports.default = router;
