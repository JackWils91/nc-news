process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe("/topics", () => {
      it("GET - /topics - status:200 - returns an array and required keys", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            //expect(body.ok).to.equal(true);
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.contain.keys(["description", "slug"]);
          });
      });
      it("GET - /topics - status:200 - returns an array with the relevant topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.eql({
              topics: [
                {
                  description: "The man, the Mitch, the legend",
                  slug: "mitch"
                },
                {
                  description: "Not dogs",
                  slug: "cats"
                },
                {
                  description: "what books are made of",
                  slug: "paper"
                }
              ]
            });
          });
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        it("GET - /users/:username - status:200 - returns a user object with username, avatar_url, name", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.be.an("object");
              expect(body.user).to.contain.keys([
                "username",
                "avatar_url",
                "name"
              ]);
            });
        });
        it("GET - /users/:username - status:200 - returns an object with the correct user data", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(body).to.eql({
                user: {
                  username: "butter_bridge",
                  name: "jonny",
                  avatar_url:
                    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
                }
              });
            });
        });
        it("GET - /users/:username - status:404 - when passed a valid character username url substring", () => {
          return request(app)
            .get("/api/users/unknown_user")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("username does not exist");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        it("GET - /articles/:article_id - status:200 - returns a user object with relevant object keys", () => {
          return request(app)
            .get("/api/articles/3")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.be.an("object");
              expect(body.article).to.contain.keys([
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes"
              ]);
            });
        });
        it("GET - /articles/:article_id - status:200 - returns an object with the correct article data", () => {
          return request(app)
            .get("/api/articles/3")
            .expect(200)
            .then(({ body }) => {
              expect(body.article.title).to.equal(
                "Eight pug gifs that remind me of mitch"
              );
            });
        });
        it("GET - /articles/article_id - status:404 - when passed a valid integer article ID url substring", () => {
          return request(app)
            .get("/api/articles/45600")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("article ID does not exist");
            });
        });
        it("GET - /articles/article_id - status:400 - when passed an invalid character article ID url substring", () => {
          return request(app)
            .get("/api/articles/dailymail")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.equal(
                'select * from "articles" where "article_id" = $1 ' +
                  '- invalid input syntax for integer: "dailymail"'
              );
            });
        });
        it("PATCH - /:article_id - status:200 - increments votes and returns the updated article as an object with all respective keys", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({
              inc_votes: 1
            })
            .expect(200) // this expect relates to supertest rather than chai
            .then(({ body }) => {
              expect(body.article.votes).to.equal(1);
              expect(body.article).to.be.an("object");
              expect(body.article).to.contain.keys([
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes"
              ]);
            });
        });
        it("PATCH - /:article_id - status:400 - for an invalid article_id", () => {
          return request(app)
            .patch("/api/articles/thesun") // going to return an empty array as a valid ID that does not exist
            .send({ inc_votes: 1 })
            .expect(400);
        });
        it("PATCH - /:article_id - status:405 - Method Not Allowed - dealt with in the router file", () => {
          return request(app)
            .put("/api/articles/45000") // invalid request type
            .send({ inc_votes: 1 })
            .expect(405);
        });
        describe("/comments", () => {
          it("GET - /articles/:article_id/comments - status:200 - returns an array of objects for an article", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.article).to.be.an("array");
                expect(body.article[0]).to.be.an("object");
                expect(body.article[0]).to.contain.keys([
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                ]);
              });
          });
        });
      });
    });
  });
});
