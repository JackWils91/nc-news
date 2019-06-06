const commentsRouter = require("express").Router();
const {
  patchVoteByCommentID,
  deleteCommentById
} = require("../controllers/comments-controller");
const { methodNotAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchVoteByCommentID)
  .delete(deleteCommentById)
  .all(methodNotAllowed);

module.exports = commentsRouter;
