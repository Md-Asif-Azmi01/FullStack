const authMiddleware = require("../middleware/authMiddleware");
const {addTask, editTask, getTask, deleteTask} = require("../services/task");
const router = require('express').Router();

router.post('/addtask', authMiddleware, addTask);
router.put('/edittask/:id', authMiddleware, editTask);
router.get('/gettask/:id', authMiddleware, getTask);
router.delete('/deletetask/:id', authMiddleware, deleteTask);

module.exports = router;