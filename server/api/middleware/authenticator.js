const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!token || !decodedToken){
        throw 'Invalid token auth';
      } else {
        //this will allow to identify the user on each request that are authenticated
        req.body.userID = decodedToken.userID
        next();
      }
    } catch (e) {
      res.status(401).json({status: 'invalid authentication'}); //new Error('Invalid request!')
    }
  }

exports.generateAccessToken= userID => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({userID:userID}, process.env.TOKEN_SECRET, { expiresIn: '6000s' });
}