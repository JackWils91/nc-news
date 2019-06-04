const articlesRouter = require("express").Router();
const {
  sendArticle,
  patchVoteByArticleId,
  sendCommentsByArticleId
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(patchVoteByArticleId)
  .all(methodNotAllowed);

articlesRouter.route("/:article_id/comments").get(sendCommentsByArticleId);

module.exports = articlesRouter;
