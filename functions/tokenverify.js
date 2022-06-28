const key = "verysecretkey";
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let bearerHeader = req.headers["auth-token"];

  console.log(bearerHeader);
  if (!bearerHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, key, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.userId;
      next();
    });
  }
};
