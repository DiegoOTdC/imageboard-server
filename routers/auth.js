const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");
const authMiddleware = require("../auth/middleware");
const validationMiddleware = require("../auth/validation");

const router = new Router();

router.get("/test-auth", authMiddleware, (req, res) => {
  console.log("what is this", req);
  console.log("this is in the req.user", req.user);
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.fullName}`,
  });
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Please supply a valid email and password");
    } else {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).send("User not found (wrong email!)");
      } else {
        const passwordsMatch = bcrypt.compareSync(password, user.password);
        console.log("passwords match?", passwordsMatch);
        if (!passwordsMatch) {
          res.status(401).send("Wrong password!"); //you can just send the "string" in stead of {message: "string"} -> usually we would send something else to the user, like "oopsie, something went wrong"
        } else {
          const token = toJWT({ userId: user.id }); // -> token = {userId:user.id}
          res.send({ token });
        }
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
