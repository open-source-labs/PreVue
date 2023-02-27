const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  res.cookie('ssid', res.locals.id, { httpOnly: true });
  return next();
};

module.exports = cookieController;
