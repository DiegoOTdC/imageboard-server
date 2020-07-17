const { Router } = require("express");
const User = require("../models").user;
const bcrypt = require("bcrypt");
const user = require("../models/user");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).send("Bad request, missing parameters");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });
      console.log("these are the newUsers, dataValues", newUser.dataValues);

      delete newUser.dataValues["password"];
      delete newUser.dataValues["id"];
      delete newUser.dataValues["createdAt"];
      delete newUser.dataValues["updatedAt"];
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
