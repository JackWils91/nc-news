const usersRouter = require("express").Router();
const { sendUser } = require("../controllers/users-controller");
const { methodNotAllowed } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(sendUser)
  .all(methodNotAllowed);

module.exports = usersRouter;
