const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc   GET goals
// @route   GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ userId: req.user.id });
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
        const goal = await Goal.create({ userId: req.user._id, text: req.body.text });
        return res.status(201).json({
            message: "Goal created successfully!",
            data: goal
        });
    }
});

// @desc   Update goals
// @route   PUT /api/goals/:id
// @access   Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400);
        throw new Error("Goal not found!");
    }

    //make sure the logged in user matches the goal userId so that only that user can update his goals
    if(req.user.id !== goal.userId)
    {
        res.status(401);
        throw new Error("User not authorized!");
    }
    else
    {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body.text, { new: true });
        return res.status(200).json({
            message: "Goal updated successfully!",
            data: updatedGoal
        });
    }
});

// @desc   Delete goals
// @route   DELETE /api/goals/:id
// @access   Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400);
        throw new Error("Goal not found!");
    }

    //make sure the logged in user matches the goal userId so that only that user can delete his goals
    if(req.user._id.toString() !== goal.userId.toString())  //You should convert the document ids in MongoDB to strings before comparing them.
    {
        res.status(401);
        throw new Error("User not authorized!");
    }
    else
    {
        await Goal.findByIdAndRemove(req.params.id);
        return res.status(200).json({
            message: "Goal deleted successfully!",
            id: req.params.id
        });
    }
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}