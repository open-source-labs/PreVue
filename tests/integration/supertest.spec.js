const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server/server');
const accountRouter = require('../../server/routes/accountRouter');
const projectRouter = require('../../server/routes/projectRouter');

// change this later!!!!!
const myURI =
  'mongodb+srv://prevue:prevue123@pvcluster.msrpd4m.mongodb.net/?retryWrites=true&w=majority';

beforeAll(async () => {
  // connect to MongoDB before all tests
  await mongoose.connect(myURI, {
    //   await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // disconnect from MongoDB after all tests
  await mongoose.disconnect();
});

describe('/users accountRouter', () => {
  describe('POST / createUser', () => {
    it('responds with 200 status and text/html content type', () => {
      return request(server)
        .post('/users/createUser')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });
  });
});

describe('/projects projectRouter', () => {
  //   describe('GET', () => {
  // it('responds with 200 status and text/html content type', () => {
  //   return request(server)
  //     .get('/')
  //     .expect('Content-Type', /text\/html/)
  //     .expect(200);
  //     });
  //   });
});
