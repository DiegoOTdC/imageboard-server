const { Router } = require("express");
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(req.query.limit || 25, 500);
    const offset = req.query.offset || 0;
    const users = await User.findAndCountAll({ limit, offset }).then((result) =>
      res.send({ users: result.rows, total: result.count })
    );
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

      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
