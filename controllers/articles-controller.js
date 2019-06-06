const {
  fetchArticle,
  updateVotes,
  fetchCommentsByArticleId,
  insertCommentsByArticleId
} = require("../models/articles-model");

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id, req.query)
    .then(articles => {
      if (!articles) {
        return Promise.reject({
          status: 404,
          msg: "article ID does not exist"
        });
      } else {
        res.status(200).send({ articles });
      }
    })
    .catch(next);
};

exports.patchVoteByArticleId = (req, res, next) => {
  const increment = req.body.inc_votes;
  const { article_id } = req.params;
  updateVotes(article_id, increment)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "article ID does not exist"
        });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, req.query)
    .then(article => {
      if (article.length < 1) {
        return Promise.reject({
          status: 404,
          msg: "article ID does not exist"
        });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
};

exports.postCommentsByArticleId = (req, res, next) => {
  const postedComment = req.body;
  const { article_id } = req.params;
  insertCommentsByArticleId(postedComment, article_id)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: "article ID does not exist"
        });
      } else {
        res.status(201).send({ comment });
      }
    })
    .catch(next);
};

// exports.sendArticles = (req, res, next) => {
//   fetchArticles()
//     .then(() => {})
//     .catch(next);
// };
