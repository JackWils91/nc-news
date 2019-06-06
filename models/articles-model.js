const connection = require("../db/connection");

exports.fetchArticle = (
  article_id,
  { sort_by = "created_at", order = "desc", author, topic }
) => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .modify(query => {
      if (article_id) {
        query.where({ "articles.article_id": article_id }).first();
      } else if (author) {
        query.where({ "articles.author": author });
      } else if (topic) {
        query.where({ "articles.topic": topic });
      }
    })
    .orderBy(sort_by, order);
};

exports.updateVotes = (article_id, increment) => {
  return connection("articles")
    .where({ article_id })
    .increment("votes", increment)
    .returning("*");
};

exports.fetchCommentsByArticleId = (
  article_id,
  { sort_by = "created_at", order = "desc" }
) => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by, order);
};

exports.insertCommentsByArticleId = (postedComment, article_id) => {
  const { username, body } = postedComment;
  const author = username;
  const newPostedComment = { author, article_id, body };
  return connection("comments")
    .where({ article_id })
    .insert(newPostedComment)
    .returning("*");
};
