const Project = require('../models/ProjectModel')

exports.getProjects = (req,res) => {
  const userID = req.body.userID
  const projectMapping = project => {return{projectID:project._id,projectName:project.project_name}}
  Project.find({owner_id: userID, deleted: false})
    .exec()
    //.then(projects => projects.length > 0 ? res.status(200).json(projects.map(projectMapping)) : res.status(204).json([]))
    .then(projects => res.status(200).json(projects.map(projectMapping)))
    .catch(_ => res.status(400).json({status:'problem fetching Projects'}))
}

exports.addProject = (req,res) => {
  const userID = req.body.userID
  const projectName = req.body.projectName
  const newProject = new Project({owner_id: userID, project_name: projectName, tasks: []})
  newProject.save()
    .then(() => res.status(201).send())
    .catch(_ => res.status(400).json({status:'error adding new project'}))
}

exports.deleteProject = (req,res) => {
  const userID = req.body.userID
  const projectID = req.params.projectID
  Project.findOne({owner_id:userID, _id:projectID})
    .exec()
    .then(project => {
      project ? project.deleted = true : res.send(204)
      project.save()
        .then(res.status(200).send())
        //.catch()
    })
    .catch(_ => res.status(400).json({status:'error deleting project'}))
}