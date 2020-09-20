const Task = require('../models/TaskModel')

const Project = require('../models/ProjectModel')

exports.getTasks = (req, res) => {
  const projectID = req.params.projectID
  const taskMapper = task => {return {
    taskID:task._id, 
    description: task.description, 
    checked: task.finish_state, 
    creationDate: task.creation_date, 
    finishDate: task.finish_date}}
  Project.findOne({_id:projectID})
    .exec()
    .then(project => project ? res.status(200).json(project.tasks.filter(task => !task.deleted).map(taskMapper)) : res.status(204).send())
    //.then(project => res.status(200).json(project))
    .catch(() => res.status(400).json({status:'error adding a task on the project'}))
}

exports.addTask = (req, res) => {
  const projectID = req.params.projectID
  const description = req.body.description
  const task = new Task({description:description})
  Project.updateOne({ _id:projectID}, { $push: {tasks:task} })
    .then(() => res.status(201).send())
    .catch(() => res.status(400).json({status:'error adding a task on the project'}))
}

exports.completeTask = (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID
  Project.updateOne({ _id:projectID, "tasks._id": taskID}, { $set: { "tasks.$.finish_state":true, "tasks.$.finish_date":Date.now() } })
    .then(() => res.status(201).send())
    .catch(() => res.status(400).json({status:'error on completing task'}))
}

exports.deleteTask = (req, res) => {
  const projectID = req.params.projectID
  const taskID = req.params.taskID
  Project.updateOne({ _id:projectID, "tasks._id": taskID}, { $set: { "tasks.$.deleted":true } })
    .then(() => res.status(200).send())
    .catch(() => res.status(400).json({status:'error on completing task'}))
}