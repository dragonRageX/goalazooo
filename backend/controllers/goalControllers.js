// desc   GET goals
// @route   GET /api/goals
// @access   Private
const getGoals = (req, res) => {
    return res.status(200).json({ message: "Get Goals" });
}

const setGoal = (req, res) => {
    return res.status(200).json({ message: "Set Goal" });
}

const updateGoal = (req, res) => {
    return res.status(200).json({ message: `Update Goal ${req.params.id}` });
}

const deleteGoal = (req, res) => {
    return res.status(200).json({ message: `Delete Goal ${req.params.id}` });
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}