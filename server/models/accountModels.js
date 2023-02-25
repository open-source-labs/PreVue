const mongoose = require('mongoose');
const myURI =
  'mongodb+srv://prevue:prevue123@pvcluster.msrpd4m.mongodb.net/?retryWrites=true&w=majority';
const { MongoClient } = require('mongodb');
mongoose
  .connect(myURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'prevueDB',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
