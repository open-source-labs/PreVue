const Users = require('../models/accountModels');
const accountController = {};

//createUser

accountController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  //Making sure username does not exist
  Users.findOne({ username })
    .then((data) => {
      if (!data) {
        Users.create({ username, password }).then((data) => { //data here is full entry, includes _id key
          res.locals.id = data._id; // sending ID for cookie auth
          return next();
        });
      } else {
        return next(err);
      }
    })
    .catch((err) => {
      next({
        log: 'account.createUser failed',
        message: `user already exists!`,
      });
    });
};

accountController.login = (req, res, next) => {
  const { username, password } = req.body;
  Users.findOne({ username, password })
    .then((data) => {
      if (data) {
        res.locals.id = data._id; // sending ID for cookie auth
        return next();
      } else {
        return next(err);
      }
    })
    .catch((err) => {
      next({
        log: 'accountcontroller login failed',
        message: `could not log in`,
      });
    });
};

// accountController.verifyUser = (req, res, next) => {
//   // write code here
//   const { username, password } = req.body;
//   Users.findOne({ username, password })
//     .then((data) => {
//       res.locals.username = data.username;
//       return next();
//     })
//     .catch((err) => {
//       // if (err.message === `Username Doesn't Exist`) res.redirect("/signup");
//       return next({
//         log: err,
//         error: `error found in userController.verifyUser`,
//       });
//     });
// };



module.exports = accountController;
