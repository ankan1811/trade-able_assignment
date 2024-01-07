const request = require('supertest');
const mainApp = require('../index'); // Ensure this is correctly pointing to your Express app instance
const mongoose = require('mongoose');

require('dotenv').config();

// Connect to the database before running the tests
beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Add any other necessary options
  });
});

// Close the database connection after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});

//If User already exists,then 400 bad request
describe('POST /api/register', () => {
  it('should register a new user', async () => {
    await request(mainApp)
      .post('/api/register')
      .send({
        username: 'testuser3',
        password: 'testpassword3',
        email:'test3@gmail.com'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
      });
  });
});


describe('POST /api/login', () => {
  it('should log in an existing user', async () => {
    await request(mainApp)
      .post('/api/login')
      .send({
        email:'test3@gmail.com',
        password: 'testpassword3',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
      });
  });
});


describe('GET /api/balance', () => {
  it('should return all products', async () => {

    // Replace 'authToken' with your actual JWT token which you received as a response from /api/login route
    //JWT token expires after 1 hour
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTlhYzljY2Y1ZTNhNzFhZjliYThkMWUiLCJpYXQiOjE3MDQ2NDMwMjcsImV4cCI6MTcwNDY0NjYyN30.83Yh3CE2rK0D_hOvZXtt_kVPF8CAXwaTjLZj-sULlMM' 

    await request(mainApp)
      .get('/api/balance')
      .set('authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

//remember that a referral link can be generated only once for a particular user .
//if you try it again,it will return 400 bad request,'Referral link already exists for this user'

  describe('POST /api/referral/generate', () => {
    it('should generate a referral link for the authenticated user', async () => {
      // Replace 'authToken' with your actual JWT token which you received as a response from /api/login route
      //JWT token expires after 1 hour
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTlhYzljY2Y1ZTNhNzFhZjliYThkMWUiLCJpYXQiOjE3MDQ2NDMwMjcsImV4cCI6MTcwNDY0NjYyN30.83Yh3CE2rK0D_hOvZXtt_kVPF8CAXwaTjLZj-sULlMM'; 
  
      await request(mainApp)
        .post('/api/referral/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.statusCode).toBe(201);
          expect(res.body).toHaveProperty('referralLink');
        });
    });
  });
  
  //remember that referral link can only be expired if used by 5 other persons or after 5 days(I have set)
  //If any of them is not true,it will return 400 bad request,'Referral link cannot be expired yet'

  describe('POST /api/referral/expire', () => {
    it('should expire the referral link for the authenticated user', async () => {
      // Replace 'authToken' with your actual JWT token which you received as a response from /api/login route
      //JWT token expires after 1 hour
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTlhYzljY2Y1ZTNhNzFhZjliYThkMWUiLCJpYXQiOjE3MDQ2NDMwMjcsImV4cCI6MTcwNDY0NjYyN30.83Yh3CE2rK0D_hOvZXtt_kVPF8CAXwaTjLZj-sULlMM'; // Replace with your actual JWT token
  
      await request(mainApp)
        .post('/api/referral/expire')
        .set('Authorization', `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty('message', 'Referral link expired successfully');
        });
    });
  });
  