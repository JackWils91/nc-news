const {
  fetchArticle,
  updateVotes,
  fetchCommentsByArticleId,
  insertCommentsByArticleId
} = require("../models/articles-model");

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id, req.query)
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
  fetchCommentsByArticleId(article_id, req.query)
    .then(comments => {
      if (comments.length < 1) {
        return fetchArticle(article_id, req.query).then(([article]) => {
          if (!article) {
            return Promise.reject({
              status: 404,
              msg:
                "trying to fetch comments for an article ID that does not exist"
            });
          } else {
            res.status(200).send({ comments });
          }
        });
      } else {
        res.status(200).send({ comments });
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

exports.sendArticles = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id, req.query)
    .then(([articles, total_count]) => {
      if (articles.length < 1) {
        const key = Object.keys(req.query);
        return Promise.reject({
          status: 404,
          msg: `No articles found for that search`
        });
      } else {
        res.status(200).send({ articles, total_count });
      }
    })
    .catch(next);
};
