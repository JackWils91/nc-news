const connection = require("../db/connection");

exports.updateCommentVotes = (comment_id, increment) => {
  return connection("comments")
    .where({ comment_id })
    .increment("votes", increment)
    .returning("*");
};

exports.removeCommentById = comment_id => {
  return connection("comments")
    .where({ comment_id })
    .del();
};
