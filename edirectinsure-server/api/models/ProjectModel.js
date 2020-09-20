const mongoose = require('mongoose')

const Task = require('./TaskModel')

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    owner_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    project_name: {type: String, required: true},
    deleted: {type: Boolean, required: true, default:false},
    tasks: [Task.schema]
},{
    timestamps:true
})

const Project = mongoose.model('Project',projectSchema);

module.exports = Project