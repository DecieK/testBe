const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
    return new Promise(async (resolve, reject) => {



        chitietve = await db.chitietves.findAll({
            where: { id_Ve: id_ve },
        });

        resolve(chitietve);

    });
    //   return res.status(200).json({
    //     title: "Express Testing",
    //     message: "The app is working properly!",
    //   });
});

module.exports = router;