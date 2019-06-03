// const {  } = require('../data');
const { topicData, userData, articleData } = require("../data/index");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(userData)
        .returning("*");
    })
    .then(() => {
      // need to take userData, pass it  through a function and add it author into autor key
    });
};
