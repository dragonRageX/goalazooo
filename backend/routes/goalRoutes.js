const express = require("express");
const router = express.Router();

const { 
    getGoals, 
    setGoal, 
    updateGoal, 
    deleteGoal 
} = require("../controllers/goalControllers");

const { protectRoutes } = require("../middleware/authMiddleware");

router.get("/", protectRoutes, getGoals);

router.post("/", protectRoutes, setGoal);

router.put("/:id", protectRoutes, updateGoal);

router.delete("/:id", protectRoutes, deleteGoal);

module.exports = router;