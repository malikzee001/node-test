const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
  // console.log('verifying...', req.headers);
  const token = req.headers.authorization;
  console.log("token", token, req.headers);
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send("Invalid token");
  }
};

module.exports = {
  auth,
};
