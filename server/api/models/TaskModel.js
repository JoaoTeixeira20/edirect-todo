const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    description: {type: String, required: true},
    finish_state: {type: Boolean, required: true, default: false},
    creation_date: {type: Date, required: true, default: Date.now()},
    finish_date: {type: Date, required: false},
    deleted: {type: Boolean, required: true, default: false}
},{
    timestamps:true
})

const Task = mongoose.model('Tasks',tasksSchema);

module.exports = Task