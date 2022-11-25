const customError = require("../errors/CustomError");

const errorHandler = (err, req, res, next) => {
    if (err instanceof customError) {
        return res.status(401).json({msg: err.message});
    }
    return res.status(500).json({error: "Something went wrong"});
}

module.exports = errorHandler