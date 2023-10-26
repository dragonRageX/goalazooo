// desc   GET goals
// @route   GET /api/goals
// @access   Private
const getGoals = (req, res) => {
    return res.status(200).json({ message: "Get Goals" });
}

// desc   Set goals
// @route   POST /api/goals
// @access   Private
const setGoal = (req, res) => {
    if(!req.body.text)
    {
        return res.status(400).json({ message: "Please enter a text field!" });
    }
    else
    {
        return res.status(200).json({ message: "Set Goal" });
    }
}

// desc   Update goals
// @route   PUT /api/goals/:id
// @access   Private
const updateGoal = (req, res) => {
    return res.status(200).json({ message: `Update Goal ${req.params.id}` });
}

// desc   Delete goals
// @route   DELETE /api/goals/:id
// @access   Private
const deleteGoal = (req, res) => {
    return res.status(200).json({ message: `Delete Goal ${req.params.id}` });
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}