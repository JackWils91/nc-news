const { fetchUser } = require("../models/users-model");

exports.sendUser = (req, res, next) => {
  const { username } = req.params;
  fetchUser(username)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({ status: 404, msg: "username does not exist" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};
