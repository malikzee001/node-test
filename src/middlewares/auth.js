const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send("Invalid token");
  }
};

module.exports = {
  auth,
};
