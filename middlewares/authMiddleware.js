const jwt = require("jsonwebtoken");
const dotEnv=require("dotenv");
dotEnv.config();

function authenticateUser(req, res, next) {
// Get token from header or other sources (e.g., cookies, query parameters)
const token = req.header('Authorization');

// Check if token is present
if (!token) {
  return res.status(401).json({ message: 'No token, authorization denied' });
}

try {
  // Verify token
  const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET); // Replace with your actual secret key

  // Attach user payload to the request object
  req.user = decoded;

  // Continue with the next middleware or route handler
  next();
} catch (err) {
  res.status(401).json({ message: 'Token is not valid' });
}
}

module.exports=authenticateUser