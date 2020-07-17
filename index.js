const express = require("express");
const app = express();
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");

const PORT = process.env.PORT || 4000;

app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
