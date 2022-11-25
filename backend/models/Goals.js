const mongoose = require("mongoose");

const goalsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    title: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Goals", goalsSchema);