const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY, JWT_ALGORITHM } = process.env;

function validateRequest(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]; 
  try {
    const verified = jwt.verify(token, JWT_SECRET_KEY, { 
      algorithms: JWT_ALGORITHM 
    });
    req.shopDomain = verified.shopDomain;
    req.accessToken = verified.accessToken;
    next();
  } catch (e) {
    res.status(401).send("Wrong token. Authentication failed");
  }
}

module.exports = validateRequest;