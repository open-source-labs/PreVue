const Project = require('../models/projectModels');
const User = require('../models/accountModels');
const projectController = {};

// saving a project
// we query the database to see if a project with the name on the req.body
// already exists
// if not, create a project; if so, update the project under that name with req.body.projectObject
projectController.saveProject = (req, res, next) => {
  console.log('INSIDE projectController.saveProject');
  console.log(
    'res.locals.username in projectController.saveProject: ',
    res.locals.username
  );
  const { project_name, projectObject } = req.body;
  console.log('project_name in projectController.saveProject: ', project_name);
  console.log(
    'projectObject in projectController.saveProject: ',
    projectObject
  );
  Project.findOne({ project_name }).then((data) => {
    if (!data) {
      console.log('making new project');
      Project.create({
        project_name,
        projectObject,
        projectOwner: res.locals.username,
      })
        .then((data) => {
          res.locals.newProject = data.projectObject;
          res.locals.projectName = data.project_name;
          return next();
        })
        .catch((err) => {
          next({
            log: `projectController.saveProject failed, ${err}`,
            message: `Can't save new project!`,
          });
        });
    } else {
      console.log('updating project');
      Project.findOneAndUpdate(
        { project_name },
        { projectObject: req.body.projectObject }
      )
        .then((data) => {
          res.locals.newProject = data.projectObject;
          res.locals.projectName = data.project_name;
          return next();
        })
        .catch((err) => {
          next({
            log: `projectController.saveProject failed, ${err}`,
            message: `Can't update project!`,
          });
        });
    }
  });
};

// updates project_ids of of User who is saving a project
// if it already exists in their projects array, it is not added
projectController.userQuery = (req, res, next) => {
  console.log('projectController.userQuery');
  User.findOneAndUpdate(
    { username: res.locals.username },
    { $addToSet: { project_ids: res.locals.projectName } },
    { new: true }
  )
    .then((data) => {
      res.locals.user = data;
      return next();
    })
    .catch((err) => {
      next({
        log: `projectController.userQuery failed, ${err}`,
        message: `user already exists!`,
      });
    });
};

// for retrieving projects ('open project' on frontend)
projectController.getProject = (req, res, next) => {
  Project.findOne({
    project_name: req.body.project_name,
    projectOwner: res.locals.username,
  })
    .then((data) => {
      res.locals.project = data.projectObject;
      return next();
    })
    .catch((err) => {
      next({
        log: `projectController.getProject failed, ${err}`,
        message: `Can't find project!`,
      });
    });
};

// general query; delete later
projectController.findProject = (req, res, next) => {
  // write code here
  // const { username } = req.body;
  Project.find({})
    .then((data) => {
      res.locals.username = data;
      return next();
    })
    .catch((err) => {
      // if (err.message === `Username Doesn't Exist`) res.redirect("/signup");
      return next({
        log: err,
        error: `error found in userController.verifyUser`,
      });
    });
};

module.exports = projectController;
