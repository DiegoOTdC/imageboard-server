const { Router } = require("express");
const Image = require("../models").image;
const { toData } = require("../auth/jwt");
const User = require("../models").user;

const router = new Router();

router.get("/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      res.send(data);
    } catch (e) {
      console.log(e.message);
      res.status(400).send("Invalid JWT token");
    }
    const allImages = await Image.findAll();
    //res.json(allImages);
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

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
