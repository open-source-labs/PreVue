const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server/server');
// const server = 'http://localhost:8080';
const accountRouter = require('../../server/routes/accountRouter');
const projectRouter = require('../../server/routes/projectRouter');
<<<<<<< HEAD
const authController = require('../../server/controllers/authController');
const jest = require('jest');
const sinon = require('sinon');
=======

// remember to put back .env rather than using exposed URI
//const myURI = needs connection string URI from env file
  
>>>>>>> dev

beforeAll(async () => {
  // connect to MongoDB before all tests
  await mongoose.connect(process.env.MONGO_URI, {
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

<<<<<<< HEAD
  // make a testAccount
  const testAccount = {
    username: 'testflynn5',
    id: '12345678',
    project_ids: ['1'],
  };

  // in mock auth middleware, assign res.locals.username and res.locals.id to the username
  // and id of testAccount
  const mockAuth = (req, res, next) => {
    res.locals.username = testAccount.username;
    res.locals.id = testAccount.id;
    console.log('we in mockAuth');
    return next();
  };

  const middlewareIndex = server._router.stack.findIndex(
    (layer) => layer.name === authController.authenticate
  );

  server._router.stack[middlewareIndex] = mockAuth;

  // const realAuth = authController.authenticate;

  describe('find a project, GET to /find', () => {
    it('responds with 200 status', () => {
      return request(server).get('/projects/find').expect(200);
    });

    it('should retrieve all projects from the database', () => {});
  });

=======
>>>>>>> dev
  describe('saving a project, POST to /saveProject', () => {
    it('responds with 201 status', () => {
      return request(server)
        .post('/projects/saveProject')
        .send(testProject)
<<<<<<< HEAD
        .expect(400);
    });

    //   it('should save a project to the database', () => {});
    // });

    // describe('find a project, POST to /getProject', () => {
    //   it('responds with 201 status', () => {});

    //   it('should retrieve a project from the database', () => {});
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

    it('creates an SSID cookie', () => {
      // return request(server).post('/users/createUser').expect(201);
=======
        .expect(201);
>>>>>>> dev
    });

    it('should save a project to the database', () => {});
  });

  describe('find a project, POST to /getProject', () => {
    it('responds with 201 status', () => {});

    it('should retrieve a project from the database', () => {});
  });
});

<<<<<<< HEAD
// let authenticateStub;

// beforeEach(() => {
//   // create a stub for the authenticate function
//   authenticateStub = sinon
//     .stub(authController, 'authenticate')
//     .callsFake((req, res, next) => next());
// });

// afterEach(() => {
//   // restore the original authenticate function
//   authenticateStub.restore();
// });

// mock the auth middleware
// jest.mock('../../server/controllers/authController', () => ({
//   authenticate: (req, res, next) => next(),
// }));
// const authenticate = (req, res, next) => {
//   // Call the next middleware function without doing any authentication
//   next();
// jest
//   .spyOn(require('../../server/controllers/authController'), 'authenticate')
//   .mockImplementation(authenticate);
=======
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
>>>>>>> dev
