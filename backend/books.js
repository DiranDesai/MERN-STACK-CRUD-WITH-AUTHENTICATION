const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
    console.log("Debbuging is funny");
    next();
});

router.get("/reading", (req, res) => {
    res.json({reading: true});
});

router.post("/reading", (req, res) => {
    res.json({sendingData: true});
});

module.exports = router;