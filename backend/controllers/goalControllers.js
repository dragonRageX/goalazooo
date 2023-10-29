const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

// @desc   GET goals
// @route   GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    return res.status(200).json(goals);
});

// @desc   Set goals
// @route   POST /api/goals
// @access   Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text)
    {
        res.status(400);
        throw new Error("Please provide a text field!");
    }
    else
    {
        const goal = await Goal.create({ text: req.body.text });
        return res.status(200).json(goal);
    }
});

// @desc   Update goals
// @route   PUT /api/goals/:id
// @access   Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400);
        throw new Error("Goal not found!");
    }
    else
    {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body.text, { new: true });
        return res.status(200).json(updatedGoal);
    }
});

// @desc   Delete goals
// @route   DELETE /api/goals/:id
// @access   Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400);
        throw new Error("Goal not found!");
    }
    else
    {
        await Goal.findByIdAndRemove(req.params.id);
        return res.status(200).json({ id: req.params.id });
    }
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}