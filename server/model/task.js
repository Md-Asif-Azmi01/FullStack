const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['yetToStart','inprogress','completed'],
        default: 'yetToStart'
    },
    priority: {
        type: String,
        required: true,
        enum: ['low','medium','high'],
        default: 'low'
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);