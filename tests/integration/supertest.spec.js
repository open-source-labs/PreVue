const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server/server');
const accountRouter = require('../../server/routes/accountRouter');
const projectRouter = require('../../server/routes/projectRouter');

// remember to put back .env rather than using exposed URI
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

describe('/projects projectRouter', () => {
  const testProject = {
    project_name: 'Test Project',
    projectObject: { state: 'state' },
    projectOwner: 'testflynn5',
  };

  describe('saving a project, POST to /saveProject', () => {
    it('responds with 201 status', () => {
      return request(server)
        .post('/projects/saveProject')
        .send(testProject)
        .expect(201);
    });

    it('should save a project to the database', () => {});
  });

  describe('find a project, POST to /getProject', () => {
    it('responds with 201 status', () => {});

    it('should retrieve a project from the database', () => {});
  });
});

describe('/users accountRouter', () => {
  const testAccount = {
    username: 'testflynn5',
    id: '12345678',
    project_ids: ['1'],
  };

  describe('POST / createUser', () => {
    it('responds with 200 status', () => {
      // return request(server).post('/users/createUser').expect(201);
    });
  });
});
