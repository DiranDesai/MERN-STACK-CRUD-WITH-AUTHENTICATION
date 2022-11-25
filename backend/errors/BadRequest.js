const CustomError = require("../errors/CustomError");

class BadRequest extends CustomError{
    constructor(message) {
        super(message);
    }
}

module.exports = BadRequest