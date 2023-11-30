const Project = require('../models/projectModels');
const User = require('../models/accountModels');
const projectController = {};

// saving a project:
projectController.saveProject = (req, res, next) => {
  const { project_name, projectObject } = req.body;
  Project.findOne({ project_name }).then(data => {
    console.log(`Saving project...`);
    if (!data) {
      Project.create({
        project_name,
        projectObject,
        projectOwner: res.locals.username
      })
        .then(data => {
          res.locals.newProject = data.projectObject;
          res.locals.projectName = data.project_name;
          return next();
        })
        .catch(err => {
          next({
            log: `projectController.saveProject failed, ${err}`,
            message: `Can't save new project!`
          });
        });
    } else {
      // if project already exists, update with new state
      Project.findOneAndUpdate(
        { project_name },
        { projectObject: req.body.projectObject }
      )
        .then(data => {
          res.locals.newProject = data.projectObject;
          res.locals.projectName = data.project_name;
          return next();
        })
        .catch(err => {
          next({
            log: `projectController.saveProject failed, ${err}`,
            message: `Can't update project!`
          });
        });
    }
  });
};

// Updates project_ids of User who's saving a project. If it already exists, it's not added.
projectController.userQuery = (req, res, next) => {
  User.findOneAndUpdate(
    { username: res.locals.username },
    { $addToSet: { project_ids: res.locals.projectName } },
    { new: true }
  )
    .then(data => {
      res.locals.user = data;
      return next();
    })
    .catch(err => {
      next({
        log: `projectController.userQuery failed, ${err}`,
        message: `user already exists!`
      });
    });
};

//For retrieving projects ('open project' on frontend)
projectController.getProject = (req, res, next) => {
  Project.findOne({
    project_name: req.body.project_name,
    projectOwner: res.locals.username
  })
    .then(data => {
      res.locals.project = data.projectObject;
      return next();
    })
    .catch(err => {
      next({
        log: `projectController.getProject failed, ${err}`,
        message: `Can't find project!`
      });
    });
};

//general query to find all projects; not used in app itself
projectController.findProject = (req, res, next) => {
  Project.find({})
    .then(data => {
      res.locals.username = data;
      return next();
    })
    .catch(err => {
      // if (err.message === `Username Doesn't Exist`) res.redirect("/signup");
      return next({
        log: err,
        error: `error found in userController.verifyUser`
      });
    });
};

module.exports = projectController;
