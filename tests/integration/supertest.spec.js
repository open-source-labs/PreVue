const request = require('supertest');
const mongoose = require('mongoose');
let server;
// const server = require('../../server/server');
const accountRouter = require('../../server/routes/accountRouter');
const projectRouter = require('../../server/routes/projectRouter');
const authController = require('../../server/controllers/authController');
const sinon = require('sinon');

beforeAll(async () => {
  // connect to MongoDB before all tests
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  // disconnect from MongoDB after all tests
  await mongoose.disconnect();
});

let sandbox;
let authenticateStub;

beforeEach(() => {
  // create sinon sandbox to simplify working with fakes that need to be restored, eases cleanup
  sandbox = sinon.createSandbox();

  // create sinon stub (object) for the authenticate middleware
  authenticateStub = sandbox.stub(authController, 'authenticate');

  // in mock auth middleware, mock res.locals.username and res.locals.id to be the values from testAccount
  authenticateStub.callsFake((req, res, next) => {
    res.locals.username = testAccount.username;
    res.locals.id = testAccount.id;
    res.cookie('ssid', 'test token', { httpOnly: true });
    next();
  });

  // use the mock middleware by replacing the original middleware in the middleware chain
  // server.use(authController.authenticate);

  // create server/app AFTER stubbing authenticate middleware (so stub is made before a reference to authController.authenticate is set up when creating app)
  server = require('../../server/server');
});

afterEach(() => {
  // restore original middleware function after each test
  sandbox.restore();
});

describe('/projects projectRouter', () => {
  // make a testAccount
  const testAccount = {
    username: 'TestProjectOwner',
    id: '12345678',
    project_ids: ['1']
  };

  // make a testProject
  const testProject = {
    project_name: 'Test Project',
    projectObject: { state: 'state' },
    projectOwner: 'TestProjectOwner'
  };

  describe('find a project, GET to /find', () => {
    it('responds with 200 status', () => {
      return request(server)
        .get('/projects/find')
        .expect(200);
    });

    it('should retrieve all projects from the database', () => {});
  });

  describe('saving a project, POST to /saveProject', () => {
    it('responds with 201 status', () => {
      return request(server)
        .post('/projects/saveProject')
        .send(testProject) // sends the testProject in req.body
        .expect(201);
    });
  });
});
