const articlesRouter = require("express").Router();
const {
  sendArticle,
  patchVoteByArticleId,
  sendCommentsByArticleId,
  postCommentsByArticleId
  // sendArticles
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(sendArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(patchVoteByArticleId)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(postCommentsByArticleId)
  .all(methodNotAllowed);

module.exports = articlesRouter;
