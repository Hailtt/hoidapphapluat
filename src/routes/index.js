const authRouter = require("./auth.router");
const converRouter = require("./conversation.router");
const messageRouter = require("./message.router");
function route(app) {
  app.use("/botchatv1/auth", authRouter);
  app.use("/botchatv1/conver", converRouter);
  app.use("/botchatv1/mess", messageRouter);
}

module.exports = route;
