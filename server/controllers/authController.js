require('dotenv').config();
const jwt = require('jsonwebtoken');

//secret key generated when integrating your app with Github OAuth (must create .env file in root directory)
const privateKey = process.env.SECRET_KEY;
const authController = {};

// assigns a JWT to a user upon login
authController.sign = (req, res, next) => {
  try {
    const { username, id } = res.locals;
    console.log(`username: ${username}`);
    const token = jwt.sign(
      {
        username,
        id
      },
      privateKey,
      { expiresIn: '6h' }
    );
    res.locals.token = token;
    return next();
  } catch (err) {
    return next(err);
  }
};

// authenticates user base on info stored on the JWT
authController.authenticate = (req, res, next) => {
  const token = req.cookies.ssid;
  // Check if token is present
  if (!token) {
    // If no token, respond with 401 Unauthorized status
    return res.status(401).send('Authentication required');
  }
  try {
    // If token present, verify it
    const decoded = jwt.verify(token, privateKey);
    res.locals.username = decoded.username;
    res.locals.id = decoded.id;
    return next();
  } catch (err) {
    // If token verification fails, handle error
    return next({
      log: `authController.authenticate failed: ${err}`,
      message: `Authentication error: Invalid token`
    });
  }
};

module.exports = authController;
