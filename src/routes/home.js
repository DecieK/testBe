const express = require("express");
const router = express.Router();
const db = {};
const chitietve = require('../services/userService');

router.get("/", async (req, res, next) => {
    try {
        res.json(await chitietve.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }



    //   return res.status(200).json({
    //     title: "Express Testing",
    //     message: "The app is working properly!",
    //   });
});

module.exports = router;