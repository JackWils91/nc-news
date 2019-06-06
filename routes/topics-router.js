const topicsRouter = require("express").Router();
const { sendAllTopics } = require("../controllers/topics-controller");
const { methodNotAllowed } = require("../errors/index");

topicsRouter
  .route("/")
  .get(sendAllTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
