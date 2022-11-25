const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const BadRequest = require("../errors/BadRequest");
const customError = require("../errors/CustomError");


dotenv.config();


function generateToken(userInfo) {
    return jwt.sign(userInfo, process.env.JWT_SECRET, {expiresIn: "16000s"});
}

const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(500).json({msg: "please enter all inputs"});
    }

    const userFound = await User.findOne({email});

    if (userFound) {
        return res.status(500).json({msg: "user with that email already exists"});
    }
    const generateSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, generateSalt);
   
    const user = await User.create({...req.body, password: hashedPassword});
    const token = generateToken({id: user._id});

    res.json({
        token,
        username: user.username,
        email: user.email
    });
}

const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequest("please enter all inputs");
        // return res.status(500).json({msg: "please enter all inputs"});
    }

    const findUser = await User.findOne({email});

    if (!findUser) {
        throw new customError("User with that email does not exist");
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);

    console.log(comparePassword);

    if (!comparePassword) {
        return res.status(509).json({msg: "Wrong password"});
    }

    const token = generateToken({id: findUser._id});


    res.json({
        token,
        username: findUser.username,
        email: findUser.email
    });

}

const usersListController = async (req, res) => {
    const users = await User.find({}).select("-password");
    res.json(users);
}

const currentUserController = async (req, res) => {
    const user = await User.find({_id: req.user.id}).select(-password);
    res.json(user);
}


module.exports = {registerController, loginController, usersListController, currentUserController};