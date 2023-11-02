const express = require("express");
const router = express.Router();
const db = {};

router.get("/", async (req, res, next) => {
    let  chitietv = await db.chitietves.findAll({})

    return res.status(200).json({


        chitietv


});
    //   return res.status(200).json({
    //     title: "Express Testing",
    //     message: "The app is working properly!",
    //   });
});

module.exports = router;