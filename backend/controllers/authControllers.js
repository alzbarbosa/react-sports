const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const { errorHandler } = require('../middleware/errorHandler')

const register = async (req, res, next) => {
  const {name, email, password} = req.body

  try {
    const userExists = await User.findOne({email})

    if (userExists) {
        return next(errorHandler(400, 'User already exists'))
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      )

    res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: token
        })
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
     const user = await User.findOne({email})
    if (!user) {
        return next(errorHandler(404, "User not found!"));}

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect){
        return next(errorHandler(400, "Wrong password or username!"));
    }
      
    const token = jwt.sign(
              { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
    );

            res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token
        })
  } catch (err) {
    next(err);
  }
};

module.exports = {register, login}