module.exports = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(401).send({ message: "not authenticated" });
  }
  req.user = token;
  next();
};
