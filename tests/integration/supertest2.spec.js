const request = require('supertest');
const mongoose = require('mongoose');
let server;
// const server = require('../../server/server');
// const server = 'http://localhost:8080';
const accountRouter = require('../../server/routes/accountRouter');
const projectRouter = require('../../server/routes/projectRouter');
const authController = require('../../server/controllers/authController');
// const jest = require('jest');
const sinon = require('sinon');

// remember to put back .env rather than using exposed URI
const myURI =
  'mongodb+srv://prevue:prevue123@pvcluster.msrpd4m.mongodb.net/?retryWrites=true&w=majority';

beforeAll(async () => {
  // console.log('node cache', Object.keys(require.cache));
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

let sandbox;
let authenticateStub;

beforeEach(() => {
  // create sinon sandbox to simplify working with fakes that need to be restored and/or verified, easing cleanup
  sandbox = sinon.createSandbox();

  // Create a sinon stub (object) for the authenticate middleware
  authenticateStub = sandbox.stub(authController, 'authenticate');

  // Mock res.locals.username and res.locals.id to be the values of testAccount
  authenticateStub.callsFake((req, res, next) => {
    res.locals.username = testAccount.username;
    res.locals.id = testAccount.id;
    res.cookie('ssid', 'test token', { httpOnly: true });
    next();
  });

  // Use the mock middleware by replacing the original middleware in the middleware chain
  // server.use(authController.authenticate);

  // create the app AFTER stubbing authenticate middleware (so the stub is made before a reference to authController.authenticate is set when creating app)
  server = require('../../server/server');
  console.log('sandbox before each', sandbox);
  console.log('authenticateStub before each', authenticateStub);
});

afterEach(() => {
  // Restore the original middleware function
  // authenticateStub.restore();
  sandbox.restore();
  // console.log('sandbox AFTER each', sandbox);
  console.log('from the after each');
});

describe('/projects projectRouter', () => {
  const testProject = {
    project_name: 'Test Project',
    projectObject: { state: 'state' },
    projectOwner: 'testflynn5',
  };

  // make a testAccount
  const testAccount = {
    username: 'testflynn5',
    id: '12345678',
    project_ids: ['1'],
  };

  // in mock auth middleware, assign res.locals.username and res.locals.id to the username
  // and id of testAccount

  // describe('find a project, GET to /find', () => {
  //   it('responds with 200 status', () => {
  //     return request(server).get('/projects/find').expect(200);
  //   });

  //   it('should retrieve all projects from the database', () => {});
  // });

  describe('saving a project, POST to /saveProject', () => {
    it('responds with 201 status', () => {
      return request(server)
        .post('/projects/saveProject')
        .send(testProject) // sending the testProject in req.body
        .expect(201);
    });
  });
});
