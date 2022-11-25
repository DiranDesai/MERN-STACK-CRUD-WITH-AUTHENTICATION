const express = require("express");
const { setGoals, getGoals, getGoal, deleteGoal } = require("../controllers/goalsController");
const protect = require("../middlewares/protect");

const router = express.Router();

router.post("/goals", protect, setGoals);
router.get("/goals", protect, getGoals); 
router.get("/goals/:id", protect, getGoal); 
router.delete("/goals/:id", protect, deleteGoal);

module.exports = router;