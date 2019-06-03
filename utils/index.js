const timeStamp = articleData => {
  return articleData.map(article => {
    let { created_at, ...newArtObj } = article;
    created_at = new Date(created_at);
    created_at.toString();
    const formattedArticle = { ...newArtObj, created_at };
    return formattedArticle;
  });
};

const createRef = articleData => {
  const ref = {};
  articleData.forEach(article => {
    ref[article.title] = article.article_id;
  });
  return ref;
};

const formatComments = (articleRef, commentsData) => {
  if (!commentsData) return [];
  const commentsArray = [];
  commentsData.forEach(comment => {
    const { belongs_to, created_by, ...remainingObj } = comment;
    const author = created_by;
    const article_id = articleRef[belongs_to];
    commentsArray.push({ ...remainingObj, author, article_id });
  });
  return commentsArray;
};

module.exports = { createRef, timeStamp, formatComments };
