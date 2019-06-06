exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handleSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    const errSplit = err.message.split("-");
    const errMsg = errSplit[errSplit.length - 1];
    res.status(400).send({ message: errMsg });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "article ID does not exist" });
  } else if (err.code === "42703") {
    res.status(400).send({ message: "column does not exist" });
  } else next(err);
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
