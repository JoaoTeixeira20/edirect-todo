const router = require('express').Router();

const authenticator = require('../middleware/authenticator')

const UserController = require('../controllers/UserController')

router.get('/', authenticator.authenticateToken, UserController.getUsers)

router.post('/signup', UserController.addUser)

router.post('/login', UserController.loginUser)

router.delete('/logout', UserController.logoutUser)

module.exports = router