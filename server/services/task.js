const Task = require('../model/task');

const addTask = async (req, res) => {
    try {
        const {title, priority, status, description} = req.body;
        console.log('Add Task called with:', req.body);
        const {user} = req;
        if(!title || !description){
            return res.status(400).json({error: "Please fill all the fields"});
        }
        if(title.length < 3){
            return res.status(400).json({error: "Title must be at least 3 characters long"});
        }
        if(description.length < 3){
            return res.status(400).json({error: "Description must be at least 3 characters long"});
        }
        console.log('yee vvvvvv');
        const newtask = new Task({title, priority, status, description});
        console.log('yee vvvvvv2222222');

        await newtask.save();
       console.log('yee vvvvvv3333333333');
        user.tasks.push(newtask._id);
        await user.save();
        return res.status(200).json({message: "Task added successfully", Task: newtask});
    } catch (error) {
        return res.status(404).json({error: "Internall server error"});
    }
};

const editTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, priority, status} = req.body;
        // const {user} = req;
        if(!title || !description){
            return res.status(400).json({error: "Please fill all the fields"});
        }
        if(title.length < 3){
            return res.status(400).json({error: "Title must be at least 3 characters long"});
        }
        if(description.length < 3){
            return res.status(400).json({error: "Description must be at least 3 characters long"});
        }
    await Task.findByIdAndUpdate(id, {title, description, priority, status});
        return res.status(200).json({message: "Task Update successfully"});
    } catch (error) {
        return res.status(404).json({error: "Internal server error"});
    }
};

const getTask = async (req, res) => {
    try {
        const {id} = req.params;
        const taskDetails = await Task.findById(id)
        return res.status(200).json({taskDetails});
    } catch (error) {
        return res.status(404).json({error: "Internal server error"});
    }
};

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const taskDetails = await Task.findByIdAndDelete(id);
        return res.status(200).json({success: "Task Deleted successfully"});
    } catch (error) {
        return res.status(404).json({error: "Internal server error"});
    }
};

module.exports = {addTask, editTask, getTask, deleteTask};

