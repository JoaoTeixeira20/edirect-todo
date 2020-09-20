const router = require('express').Router();

const authenticator = require('../middleware/authenticator')

const ProjectController = require('../controllers/ProjectController')

router.get('/', authenticator.authenticateToken, ProjectController.getProjects)

router.post('/', authenticator.authenticateToken, ProjectController.addProject)

router.delete('/:projectID', authenticator.authenticateToken, ProjectController.deleteProject)

module.exports = router
