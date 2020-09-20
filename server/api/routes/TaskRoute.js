const router = require('express').Router();

const authenticator = require('../middleware/authenticator')

const TaskController = require('../controllers/TaskController')

router.get('/:projectID', authenticator.authenticateToken, TaskController.getTasks)

router.post('/:projectID', authenticator.authenticateToken, TaskController.addTask)

router.delete('/:projectID/:taskID', authenticator.authenticateToken, TaskController.deleteTask)

router.put('/:projectID/:taskID', authenticator.authenticateToken, TaskController.completeTask)

module.exports = router
