const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jvd", (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        return res.status(201).send({ msg: "Login again" });
      }
    });
  } else {
    return res.status(201).send({ msg: "Login first" });
  }
};

module.exports = auth;
