const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.signedCookies.token;

  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") {
    return res.status(403).send("NOT authorized");
  }
  req.user = token;
  next();
};
