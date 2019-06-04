const connection = require("../db/connection");

exports.fetchArticle = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id });
};

exports.updateVotes = (article_id, increment) => {
  return connection("articles")
    .where({ article_id })
    .increment("votes", increment)
    .returning("*");
};

exports.fetchCommentsByArticleId = article_id => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id });
};
