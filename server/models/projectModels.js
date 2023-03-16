const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for projects stored in database
const projectSchema = new Schema({
  project_name: { type: String, required: true },
  projectObject: { type: Object, required: true },
  projectOwner: { type: String, required: true }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
