require('dotenv').config();
const jwt = require('jsonwebtoken');


// the secret key generated when integrating your app with Github OAuth
const privateKey = process.env.SECRET_KEY;

const authController = {};


// assigns a JWT to a user upon login
authController.sign = (req, res, next) => {
  try {
    const { username, id } = res.locals;
    console.log(`username: ${username}, id: ${id}`);
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
// authController.authenticate = (req, res, next) => {
//   try {
//     const { ssid } = req.cookies;
//     //decoded becomes {id,username}
//     const decoded = jwt.verify(ssid, privateKey);
//     res.locals.username = decoded.username;
//     res.locals.id = decoded.id;
//     return next();
//   } catch (err) {
//     return next({
//       log: `authController.authenticate failed: ${err}`,
//       message: `An authentication error occured.`
//     });
//   }
// };


// authenticates user base on info stored on the JWT
authController.authenticate = (req, res, next) => {
  const token = req.cookies.ssid;
  console.log(`token for authentication: ${token}`);
  // Check if the token is present
  if (!token) {
    // If no token, respond with a 401 Unauthorized status
    return res.status(401).send('Authentication required');
  }
  try {
    // If token is present, verify it
    const decoded = jwt.verify(token, privateKey);
    res.locals.username = decoded.username;
    res.locals.id = decoded.id;
    return next();
  } catch (err) {
    // If token verification fails, handle the error
    return next({
      log: `authController.authenticate failed: ${err}`,
      message: `Authentication error: Invalid token`
    });
  }
};

module.exports = authController;
