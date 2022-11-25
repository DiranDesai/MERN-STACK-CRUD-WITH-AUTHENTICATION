const Goals = require("../models/Goals");

const setGoals = async (req, res) => {
    const {title} = req.body;
    const goal = await Goals.create({title, user: req.user._id});
    res.status(201).json(goal);
}

const getGoals = async (req, res) => {
    const goals = await Goals.find({user: req.user._id});
    res.json(goals);
}

const getGoal = async (req, res) => {
    const { id } = req.params;
    const goal = await Goals.findOne({_id: id});
    
    if (goal) {
        return res.json(goal);
    }
}

const deleteGoal = async (req, res) => {
    const { id } = req.params;
    const goal = await Goals.findOne({_id: id});
    
    if (goal) {
        await goal.remove();
        return res.json(200).json({msg: "Deleted successfully"});
    }
}


module.exports = {setGoals, getGoals, getGoal, deleteGoal}