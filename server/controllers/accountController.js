const Users = require('../models/accountModels');
const accountController = {};

// enters a user into the database after GitHub OAuth if an entry
// does not already exist
accountController.createUser = (req, res, next) => {
  const { username, id } = res.locals;
  //Making sure username does not exist
  Users.findOne({ username })
    .then(data => {
      if (!data) {
        Users.create({ username, id }).then(data => {
          //data here is full entry, includes _id key
          res.locals.id = data._id; // sending ID for cookie auth
          return next();
        });
      } else {
        return next();
      }
    })
    .catch(err => {
      next({
        log: `accountController.createUser failed: ${err}`,
        message: `User already exists!`
      });
    });
};

// showing the logged in user's projects before the mounting
// of the home page
accountController.userProjects = (req, res, next) => {
  Users.findOne({ username: res.locals.username })
    .then(data => {
      res.locals.userProjects = data.project_ids;
      return next();
    })
    .catch(err => {
      next({
        log: 'accountController.userProjects failed',
        message: `could not find projects for user`
      });
    });
};

// just for test purposes; returns all users in the database
accountController.findUser = (req, res, next) => {
  // write code here
  // const { username } = req.body;
  Users.find({})
    .then(data => {
      res.locals.username = data;
      return next();
    })
    .catch(err => {
      // if (err.message === `Username Doesn't Exist`) res.redirect("/signup");
      return next({
        log: err,
        error: `error found in userController.findUser`
      });
    });
};

module.exports = accountController;
