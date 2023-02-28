const Project = require('../models/projectModels');
const projectController = {};

projectController.createProject = (req, res, next) => {
  const { project_id, projectObject, projectOwner } = req.body;
  Project.create({
    project_id,
    projectObject,
    projectOwner, // res.locals.username,
  })
    .then((data) => {
      res.locals.newProject = data.project_id;
      return next();
    })
    .catch((err) => {
      next({
        log: 'account.createUser failed',
        message: `user already exists!`,
      });
    });
};

module.exports = projectController;
