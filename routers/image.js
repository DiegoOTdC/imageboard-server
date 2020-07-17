const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.send(images);
  } catch (e) {
    next(e);
  }
});

router.get("/:image", async (req, res, next) => {
  try {
    const imageId = req.params.image;
    if (!imageId) {
      res.status(404).send({ message: "Image not found" });
    } else {
      const image = await Image.findByPk(imageId);
      res.send(image);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, url } = req.body;
    if ((!title, !url)) {
      return res.status(400).send("Bad request missing title or url");
    } else {
      const newImage = await Image.create({ title, url });
      res.send(newImage);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
