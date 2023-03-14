const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for users stored in database
const userSchema = new Schema({
  username: { type: String, required: true },
  id: { type: String, required: true },
  project_ids: { type: Array }
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
