const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne({_id: decoded.id}).select("-password");
            next();
        } catch (error) {
            console.log(error);
        }
    } else {
        // res.status(401).json({msg: "Not authenticated, No Token"});
        throw new Error("Not authenticated, No Token");
    }
}

module.exports = protect;