const User = require('../models/UserModel')
const authenticator = require('../middleware/authenticator')

exports.addUser = async (req,res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new User({name:name,username:username,password:password});
  newUser.save()
    .then(() => res.status(201).send())
    .catch(_ => res.status(400).json({status:'problem trying to sign in, probably username already exists'}))
  }

//testing purp
exports.getUsers = (_,res) => {
const usersMapper = user => {return{name:user.name, username:user.username}}
User.find()
  .exec()
  .then(users => res.json(users.map(usersMapper)))
  .catch(_ => res.status(400).json({status:'problem fetching users'}));
}

exports.loginUser = (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({username:username})
    .exec()
    .then(async user => {
      //if user exists
      if (user) {
        //compares the hashed stored password (the hash is asyncronous so it's need to wait for the hash)
        const AuthenticationStatus = await user.isCorrectPassword(password)
        if (AuthenticationStatus){
          const loginToken = authenticator.generateAccessToken(user._id)
          //my attempt to use cookies to store the authorization header, cross-origin is strict.. :/
          //res.cookie('BearerToken', loginToken, {httponly: true, secure: false, sameSite: true, expires: new Date(Date.now() + 900000)})
          //res.cookie('username', username, {httponly: true, secure: false, sameSite: true, expires: new Date(Date.now() + 900000)})
          //res.header('BearerToken', loginToken)
          res.status(200).json({BearerToken:loginToken, username:username})
          return //stop this function if both username and password conditions are met and prevent the res below that throws an error
        }
      }
      res.status(401).json({status:'username not found or incorrect password'})
    })
    .catch(_ => {
      res.status(400).json({status:'some problem occured on login'})
    })
}

//deprecated
exports.logoutUser = (_,res) => {
  try{
    res.cookie('BearerToken', "", {httponly: true, expires: new Date(Date.now())})
    res.cookie('username', "", {httponly: true, expires: new Date(Date.now())})
    res.status(202).send()
  }catch (_) {
    res.status(400).json({status:'problem occured on logout'})
  }
}