// const {  } = require('../data');
const {
  topicData,
  userData,
  articleData,
  commentData
} = require("../data/index");
const { timeStamp, createRef, formatComments } = require("../../utils/index");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsPromise = knex("topics").insert(topicData);
      const usersPromise = knex("users").insert(userData);
      return Promise.all([topicsPromise, usersPromise]);
    })
    .then(() => {
      const updatedArticleData = timeStamp(articleData);
      return knex("articles")
        .insert(updatedArticleData)
        .returning("*");
    })
    .then(articles => {
      const timeStampedCommentData = timeStamp(commentData);
      const articleRef = createRef(articles);
      const updatedCommentData = formatComments(
        articleRef,
        timeStampedCommentData
      );
      return knex("comments")
        .insert(updatedCommentData)
        .returning("*");
    });
};
