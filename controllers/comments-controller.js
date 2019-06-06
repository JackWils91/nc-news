const {
  updateCommentVotes,
  removeCommentById
} = require("../models/comments-model");

exports.patchVoteByCommentID = (req, res, next) => {
  const increment = req.body.inc_votes;
  const { comment_id } = req.params;
  updateCommentVotes(comment_id, increment)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: "comment ID does not exist"
        });
      } else {
        res.status(200).send({ comment });
      }
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(deletedComment => {
      if (deletedComment) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: "comment_id not found" });
      }
    })
    .catch(next);
};
