const jwt = require('jsonwebtoken');
require('dotenv').config();

// the secret key generated when integrating your app with Github OAuth
const privateKey = process.env.SECRET_KEY;

const authController = {};

// authenticates user base on info stored on the JWT
authController.authenticate = (req, res, next) => {
  try {
    const { ssid } = req.cookies;
    //decoded becomes {id,username}
    const decoded = jwt.verify(ssid, privateKey);
    res.locals.username = decoded.username;
    res.locals.id = decoded.id;
    return next();
  } catch (err) {
    return next({
      log: `authController.authenticate failed: ${err}`,
      message: `An authentication error occured.`
    });
  }
};

// assigns a JWT to a user upon login
authController.sign = (req, res, next) => {
  try {
    const { username, id } = res.locals;
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

module.exports = authController;
