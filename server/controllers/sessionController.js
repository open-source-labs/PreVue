// const Session = require('../models/sessionModel');
// const sessionController = {};

// // check cookie for res.cookie.ssid
// // query DB for that cookie value
// // if found, user is verified
// sessionController.isLoggedIn = (req, res, next) => {
//   let query = { cookieId: req.cookies.ssid };
//   if ('id' in res.locals) query = { _id: res.locals.id };
//   console.log(query);
//   Session.findOne(query)
//     .then((result) => {
//       console.log(result);
//       next();
//     })
//     .catch((err) =>
//       next({
//         log: err,
//         error: `error found in sessionController.isLoggedIn`,
//       })
//     );
// };

// sessionController.startSession = (req, res, next) => {
//   //write code here
//   // Session.create(...)
//   Session.create({ cookieId: res.locals.id }) // findOneAndUpdate()?
//     .then((result) => {
//       console.log('result', result);
//       next();
//     })
//     .catch((err) => {
//       next({
//         log: err,
//         error: `error found in sessionController.startSession`,
//       });
//     });
// };



// module.exports = sessionController;
