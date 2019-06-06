process.env.NODE_ENV = "test";

//const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const chai = require("chai");
chai.use(require("chai-sorted"));
const { expect } = chai;

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
      it("GET - /articles - status:200 - returns an article array of objects with relevant object keys", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.an("array");
            expect(body.articles[0]).to.contain.keys([
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            ]);
          });
      });
      it("GET - /articles?sort_by=article_id - status:200 - sorts by any valid column", () => {
        return request(app)
          .get("/api/articles?sort_by=article_id")
          .expect(200)
          .then(({ body }) => {
            //console.log(body.article);
            expect(body.articles).to.be.descendingBy("article_id");
          });
      });
      it("GET - /articles - status:200 - sort defaults to created_at (date)", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("created_at");
          });
      });
      it("GET - /articles?order=asc - status:200 - can be sorted by ascending/descending order", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy("created_at");
          });
      });
      it("GET - /articles?order=asc - status:200 - defaults to descending order", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("created_at");
          });
      });
      it("GET - /articles?author - status:200 - filters articles by author value specified in the query", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([
              {
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                comment_count: "13",
                created_at: "2018-11-15T12:21:54.171Z",
                votes: 100
              },
              {
                article_id: 9,
                title: "They're not exactly dogs, are they?",
                topic: "mitch",
                author: "butter_bridge",
                body: "Well? Think about it.",
                comment_count: "2",
                created_at: "1986-11-23T12:21:54.171Z",
                votes: 0
              },
              {
                article_id: 12,
                title: "Moustache",
                topic: "mitch",
                author: "butter_bridge",
                body: "Have you seen the size of that thing?",
                comment_count: "0",
                created_at: "1974-11-26T12:21:54.171Z",
                votes: 0
              }
            ]);
          });
      });
      it("GET - /articles?author=not-an-author - status:404 - when passed a valid integer article ID url substring", () => {
        return request(app)
          .get("/api/articles?author=not-an-author")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("not-an-author does not exist");
          });
      });
      it("GET - /articles?topic=not-a-topic - status:404 - when passed a valid integer article ID url substring", () => {
        return request(app)
          .get("/api/articles?topic=not-a-topic")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("not-a-topic does not exist");
          });
      });
      it("GET - /articles?sort_by=not-a-column - status:400 - when passed a valid integer article ID url substring", () => {
        return request(app)
          .get("/api/articles?sort_by=not-a-column")
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.equal("column does not exist");
          });
      });
      it("GET - /articles?topic - status:200 - filters the articles by the topic value specified in the query", () => {
        return request(app)
          .get("/api/articles?topic=cats")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([
              {
                article_id: 5,
                title: "UNCOVERED: catspiracy to bring down democracy",
                topic: "cats",
                author: "rogersop",
                body: "Bastet walks amongst us, and the cats are taking arms!",
                comment_count: "2",
                created_at: "2002-11-19T12:21:54.171Z",
                votes: 0
              }
            ]);
          });
      });
      describe("/:article_id", () => {
        it("GET - /articles/:article_id - status:200 - returns an article object with relevant object keys", () => {
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
                "votes",
                "comment_count"
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
                ' invalid input syntax for integer: "dailymail"'
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
        it("PATCH - /:article_id - status:200 - request with no information in the request body sends the unchanged article to the client", () => {
          return request(app)
            .patch("/api/articles/1") // invalid request type
            .send({})
            .expect(200)
            .then(({ body }) =>
              expect(body.article).to.eql({
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 100,
                topic: "mitch",
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171Z"
              })
            );
        });

        describe("/comments", () => {
          it("GET - /articles/:article_id/comments - status:200 - returns an array of objects for an article", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.an("array");
                expect(body.comments[0]).to.be.an("object");
                expect(body.comments[0]).to.contain.keys([
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                ]);
              });
          });
          it("GET - /articles/:article_id/comments?sort_by=comment_id - status:200 - sorts by any valid column", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=comment_id")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.descendingBy("comment_id");
              });
          });
          it("GET - /articles/:article_id/comments - status:200 - sort defaults to created_at", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.descendingBy("created_at");
              });
          });
          it("GET - /articles/:article_id/comments?order=asc - status:200 - can be sorted by ascending/descending order", () => {
            return request(app)
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.ascendingBy("created_at");
              });
          });
          it("GET - /articles/:article_id/comments?order=asc - status:200 - defaults to descending order", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.descendingBy("created_at");
              });
          });
          it("GET - /articles/:article_id/comments - status:404 - when passed a valid integer article ID url substring", () => {
            return request(app)
              .get("/api/articles/26000/comments")
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("article ID does not exist");
              });
          });
          it("GET - /articles/:article_id/comments - status:400 - when passed an invalid character article ID url substring", () => {
            return request(app)
              .get("/api/articles/anycharacter/comments")
              .expect(400)
              .then(({ body }) => {
                expect(body.message).to.equal(
                  ' invalid input syntax for integer: "anycharacter"'
                );
              });
          });
          it("GET - /articles/:article_id/comments - status:200 - when passed an article with no comments", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(200)
              .then(({ body }) => {
                console.log(body);
              });
          });
          it("POST - /articles/:article_id/comments - status:200 - responds with a posted comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "lurker",
                body: "POST request to comments confirmed"
              })
              .expect(201)
              .then(({ body }) => {
                const adj = body.comment;
                expect(adj.body).to.equal("POST request to comments confirmed");
                expect(adj).to.be.an("object");
                expect(adj).to.contain.keys(["author", "body"]);
              });
          });
          it("POST - /articles/:article_id/comments - status:200 - responds with author and article ID", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "lurker",
                body: "POST request to comments confirmed"
              })
              .expect(201)
              .then(({ body }) => {
                const adj = body.comment;
                expect(adj.article_id).to.equal(1);
                expect(adj.author).to.equal("lurker");
              });
          });
          it("POST - /articles/:article_id/comments - status:400 - for an invalid article_id", () => {
            return request(app)
              .post("/api/articles/thesun/comments") // going to return an empty array as a valid ID that does not exist
              .send({
                username: "lurker",
                body: "POST request to comments confirmed"
              })
              .expect(400);
          });
          it("POST - /articles/:article_id/comments - status:404 - when passed a valid integer article ID url substring", () => {
            return request(app)
              .post("/api/articles/4600/comments")
              .send({
                username: "lurker",
                body: "POST request to comments confirmed"
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("article ID does not exist");
              });
          });
          it("POST - /articles/:article_id/comments - status:405 - Method Not Allowed - dealt with in the router file", () => {
            return request(app)
              .put("/api/articles/45000/comments") // invalid request type
              .send({
                username: "lurker",
                body: "POST request to comments confirmed"
              })
              .expect(405);
          });
        });
      });
    });
    describe("/comments", () => {
      it("PATCH - /comments/:comment_id - status:200 - increments votes and returns the updated comment as an object with all respective keys", () => {
        return request(app)
          .patch("/api/comments/6")
          .send({
            inc_votes: 1
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.votes).to.equal(1);
            expect(body.comment).to.be.an("object");
            expect(body.comment).to.contain.keys([
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            ]);
          });
      });
      it("PATCH - /comments/:comment_id - status:400 - for an invalid comment_id", () => {
        return request(app)
          .patch("/api/comments/thesun") // going to return an empty array as a valid ID that does not exist
          .send({ inc_votes: 1 })
          .expect(400);
      });
      it("PATCH - /comments/:comment_id - status:404 - for a valid integer value but invalid comment_id in database", () => {
        return request(app)
          .patch("/api/comments/45000") // going to return an empty array as a valid ID that does not exist
          .send({ inc_votes: 1 })
          .expect(404);
      });
      it("PATCH - /comments/:comment_id - status:405 - Method Not Allowed - dealt with in the router file", () => {
        return request(app)
          .put("/api/comments/45000") // invalid request type
          .send({ inc_votes: 1 })
          .expect(405);
      });
      it("DELETE - /comments/:comment_id - status: 204 - deletes the requested comment", () => {
        return request(app)
          .delete("/api/comments/6")
          .expect(204);
      });
      it("DELETE - /comments/:comment_id - status:400 - for an invalid comment_id", () => {
        return request(app)
          .delete("/api/comments/thesun")
          .expect(400);
      });
      it("DELETE - /comments/:comment_id - status:404 - for a valid integer value but invalid comment_id in database", () => {
        return request(app)
          .delete("/api/comments/45000")
          .expect(404);
      });
      it("DELETE - /comments/:comment_id - status:405 - Method Not Allowed - dealt with in the router file", () => {
        return request(app)
          .put("/api/comments/45000")
          .expect(405);
      });
    });
  });
});
