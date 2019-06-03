const { createRef, timeStamp, formatComments } = require("../utils");
const { expect } = require("chai");

describe("utils", () => {
  describe("timeStamp", () => {
    it("takes an array of one object and returns an array of one object with an updated value", () => {
      const input = [
        {
          title: "The vegan carnivore?",
          topic: "cooking",
          author: "tickle122",
          body: "string of information",
          created_at: 1492163783248
        }
      ];
      const actualResult = timeStamp(input);

      const expectedTimeString =
        "Fri Apr 14 2017 10:56:23 GMT+0100 (British Summer Time)";
      const actualTimeString = actualResult[0].created_at.toString();
      expect(actualTimeString).to.equal(expectedTimeString);
    });
    it("takes an object and returns an object with all relevant keys", () => {
      const input = [
        {
          title: "The vegan carnivore?",
          topic: "cooking",
          author: "tickle122",
          body: "string of information",
          created_at: 1492163783248
        }
      ];
      const actualResult = timeStamp(input);

      expect(actualResult[0]).to.have.all.keys(
        "title",
        "topic",
        "author",
        "body",
        "created_at"
      );
    });
    it("takes an array of objects and returns an array of objects with an updated value", () => {
      const input = [
        {
          title: "The vegan carnivore?",
          topic: "cooking",
          author: "tickle122",
          body: "string of information",
          created_at: 1492163783248
        },
        {
          title:
            "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
          topic: "coding",
          author: "jessjelly",
          body: "Many people know Watson as the IBM-develop...",
          created_at: 1500584273256
        },
        {
          title: "22 Amazing open source React projects",
          topic: "coding",
          author: "happyamy2016",
          body: "This is a collection of ... the 22 projects was 1,681.",
          created_at: 1500659650346
        }
      ];
      const actualResult = timeStamp(input);
      actualResult.forEach(result => {
        expect(result.created_at).to.be.an.instanceof(Date);
      });
      //   const expectedTimeString =
      //     "Fri Apr 14 2017 10:56:23 GMT+0100 (British Summer Time)";
      //   const actualTimeString = actualResult[0].created_at.toString();
      //   expect(actualTimeString).to.equal(expectedTimeString);
    });
  });

  describe("createRef", () => {
    it("receives an empty array and returns an empty object", () => {
      const articles = [];
      //const commentData = {};
      const actualResult = createRef(articles);
      const expectedResult = {};
      expect(actualResult).to.eql(expectedResult);
    });
    it("takes an array of one object and creates an object containing article title as key and article primary key as value pair", () => {
      const articles = [
        {
          article_id: 1,
          title: "Running a Node App",
          body:
            "This is part two of a series on how to get up and " +
            "running with Systemd and Node.js. This part dives " +
            "deeper into how to successfully run your app with " +
            "systemd long-term, and how to set it up in a production " +
            "environment.",
          votes: 0,
          topic: "coding",
          author: "jessjelly",
          created_at: "2016-08-18T12:07:52.389Z"
        }
      ];

      const actualResult = createRef(articles);
      const expectedResult = {
        "Running a Node App": 1
      };
      expect(actualResult).to.eql(expectedResult);
    });
    it("takes an array of one object and creates an object containing article title as key and article primary key as value pair", () => {
      const articles = [
        {
          article_id: 1,
          title: "Running a Node App",
          body:
            "This is part two of a series on how to get up and " +
            "running with Systemd and Node.js. This part dives " +
            "deeper into how to successfully run your app with " +
            "systemd long-term, and how to set it up in a production " +
            "environment.",
          votes: 0,
          topic: "coding",
          author: "jessjelly",
          created_at: "2016-08-18T12:07:52.389Z"
        },
        {
          article_id: 2,
          title:
            "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
          body:
            "Many people know Watson as the IBM-developed cognitive super " +
            "computer that won the Jeopardy! gameshow in 2011. In truth, Watson " +
            "is not actually a computer but a set of algorithms and APIs, and " +
            "since winning TV fame (and a $1 million prize) IBM has put it to " +
            "use tackling tough problems in every industry from healthcare to " +
            "finance. Most recently, IBM has announced several new partnerships " +
            "which aim to take things even further, and put its cognitive " +
            "capabilities to use solving a whole new range of problems around " +
            "the world.",
          votes: 0,
          topic: "coding",
          author: "jessjelly",
          created_at: "2017-07-20T20:57:53.256Z"
        },
        {
          article_id: 3,
          title: "22 Amazing open source React projects",
          body:
            "This is a collection of open source apps built with React.JS " +
            "library. In this observation, we compared nearly 800 projects to " +
            "pick the top 22. (React Native: 11, React: 11). To evaluate the " +
            "quality, Mybridge AI considered a variety of factors to determine " +
            "how useful the projects are for programmers. To give you an idea on " +
            "the quality, the average number of Github stars from the 22 projects " +
            "was 1,681.",
          votes: 0,
          topic: "coding",
          author: "happyamy2016",
          created_at: "2017-07-21T17:54:10.346Z"
        }
      ];

      const actualResult = createRef(articles);
      const expectedResult = {
        "Running a Node App": 1,
        "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
        "22 Amazing open source React projects": 3
      };
      expect(actualResult).to.eql(expectedResult);
    });
  });
  describe("formatComments", () => {
    it("receives an empty article reference and empty comment data and returns an empty object", () => {
      const articleRef = {};
      const commentData = [];
      const actualResult = formatComments(articleRef, commentData);
      const expectedResult = [];
      expect(actualResult).to.eql(expectedResult);
    });
    it("receives an object with article references and an array of objects with comment data and returns the article id and author key with primary reference key and value for created_by respectively", () => {
      const articleRef = { "Running a Node App": 1 };
      const commentData = [
        {
          body:
            "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
          belongs_to: "Running a Node App",
          created_by: "weegembump",
          votes: 11,
          created_at: 1454293795551
        }
      ];
      const actualResult = formatComments(articleRef, commentData);
      const expectedResult = [
        {
          body:
            "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",

          article_id: 1,
          author: "weegembump",
          votes: 11,
          created_at: 1454293795551
        }
      ];
      expect(actualResult).to.eql(expectedResult);
    });
    it("receives an object with article references and an array of objects with comment data and returns for multiple objects in the commentsData array", () => {
      const articleRef = {
        "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
        "22 Amazing open source React projects": 3,
        "Making sense of Redux": 4
      };
      const commentData = [
        {
          body:
            "Est pariatur quis ipsa culpa unde temporibus et accusantium rerum. Consequatur in occaecati aut non similique aut quibusdam. Qui sunt magnam iure blanditiis. Et est non enim. Est ab vero dolor.",
          belongs_to:
            "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
          created_by: "jessjelly",
          votes: -1,
          created_at: 1468655332950
        },
        {
          body:
            "Voluptatem ipsam doloremque voluptate debitis voluptas nam non delectus rem. Et dicta assumenda dignissimos sed ea. Odit perspiciatis dicta consequatur aut facere in. Accusamus qui laudantium tenetur reprehenderit sed et velit iusto. Illo nihil voluptas rerum.",
          belongs_to: "22 Amazing open source React projects",
          created_by: "grumpy19",
          votes: 11,
          created_at: 1465856809171
        },
        {
          body:
            "Soluta autem fuga non alias. Odit eligendi voluptas reiciendis repudiandae reiciendis doloribus adipisci qui consequuntur. Et dignissimos unde optio. Recusandae aspernatur eius error. Eos autem et iusto sunt fuga ipsam omnis voluptatem rerum.",
          belongs_to: "Making sense of Redux",
          created_by: "jessjelly",
          votes: 6,
          created_at: 1515019009051
        }
      ];
      const actualResult = formatComments(articleRef, commentData);
      const expectedResult = [
        {
          body:
            "Est pariatur quis ipsa culpa unde temporibus et accusantium rerum. Consequatur in occaecati aut non similique aut quibusdam. Qui sunt magnam iure blanditiis. Et est non enim. Est ab vero dolor.",
          article_id: 2,
          author: "jessjelly",
          votes: -1,
          created_at: 1468655332950
        },
        {
          body:
            "Voluptatem ipsam doloremque voluptate debitis voluptas nam non delectus rem. Et dicta assumenda dignissimos sed ea. Odit perspiciatis dicta consequatur aut facere in. Accusamus qui laudantium tenetur reprehenderit sed et velit iusto. Illo nihil voluptas rerum.",
          article_id: 3,
          author: "grumpy19",
          votes: 11,
          created_at: 1465856809171
        },
        {
          body:
            "Soluta autem fuga non alias. Odit eligendi voluptas reiciendis repudiandae reiciendis doloribus adipisci qui consequuntur. Et dignissimos unde optio. Recusandae aspernatur eius error. Eos autem et iusto sunt fuga ipsam omnis voluptatem rerum.",
          article_id: 4,
          author: "jessjelly",
          votes: 6,
          created_at: 1515019009051
        }
      ];
      expect(actualResult).to.eql(expectedResult);
    });
  });
});
