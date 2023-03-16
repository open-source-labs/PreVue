const cookieController = {};

// sets cookie with key of 'ssid' and value of generated JWT
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.token, { httpOnly: true });
  return next();
};

// used to log out a user
cookieController.deleteCookie = (req, res, next) => {
  res.clearCookie('ssid');
  return next();
};

module.exports = cookieController;
