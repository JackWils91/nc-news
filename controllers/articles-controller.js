const {
  fetchArticle,
  updateVotes,
  fetchCommentsByArticleId
} = require("../models/articles-model");

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
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
  fetchCommentsByArticleId(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};
