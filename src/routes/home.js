const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
          let chitietve = "";
          if (id_ve === "ALL") {
            chitietve = await db.chitietves.findAll({
            });
          }
    
          if (id_ve && id_ve !== "ALL") {
            chitietve = await db.chitietves.findAll({
              where: { id_Ve: id_ve },
            });
          }
          resolve(chitietve);
        } catch (e) {
          reject(e);
        }
      });
//   return res.status(200).json({
//     title: "Express Testing",
//     message: "The app is working properly!",
//   });
});

module.exports = router;