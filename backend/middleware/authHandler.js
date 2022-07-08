const jwt = require('jsonwebtoken');
const { errorHandler } = require('./errorHandler');
const User = require('../models/userModel')

const authHandler = async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization

  if(authHeader && authHeader.startsWith('Bearer')) {
     try {
      token = authHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from the token
            req.user = await User.findOne(decoded).select('-password')
            next()
    } catch(error) {
        next(error)
    }
  }

  if (!token) {
    return next(errorHandler(401, "You are not authenticated!"));
  }
  
};


module.exports = {authHandler}