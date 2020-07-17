const express = require("express");
const app = express();
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const authMiddleware = require("./auth/middleware");
const PORT = process.env.PORT || 4000;
const jsonParser = express.json();

app.use(jsonParser);

app.use("/", authRouter);
app.use("/images", authMiddleware, imageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
