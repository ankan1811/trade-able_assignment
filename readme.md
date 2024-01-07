# Trade:able Assignment

## Overview

This project provides a set of RESTful APIs for managing users, posts, and comments. It allows users to create, view, and edit their profiles, create posts, retrieve posts, and comment on posts.

### Purposefully, I have kept the .env file so that the setup becomes easy. Obviously,it will be gitignored in a real scenario

## Base URL

The base URL for all endpoints is: `http://localhost:3000/`

## To Run

### 1.npm install 2.npm start

## To Test (All comments written on the test file for each route)

### (📌 Before testing , replace the 'authToken' fields in the 'everything.test.js' file with the actual token received during login from the /api/login route)

### Now run npm test

#### (📌 The test of the /api/referral/expire route will not pass (return 400 bad request) if the referral link has not been used by 5 people or it hasnt been 5 days yet(I have set this))

## Authentication

### Authentication is required for certain endpoints.

### ( So in postman from the Authorization tab choose "Bearer Token" and paste the token which you received from login route)

### Rate Limiting(Bonus): If any of the refrral links are hit 10 times in a row,it will display the message:

#### "Too many requests from this IP, please try again later."

# Documentation

### Register User

- **Endpoint:** `/api/register`
- **Method:** `POST`
- **Description:** Register a new user by providing username, email, and password in the request body.
- **Request Body:**

  ```json
  {
    "username": "example_user",
    "email": "user@example.com",
    "password": "password123" (minimum length:6)
  }
  ```

### Login User

- **Endpoint:** `/api/login`
- **Method:** POST
  Description: Authenticate and log in a user. Provide email and password in the request body.

Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response: Returns a JWT token if successful for further authentication.

### Get User Balance

- **Endpoint:** `/api/balance`
- **Method:**: GET
  Description: Retrieve user balance by user ID.

Authorization: Bearer Token (JWT)

```json
{
  "userId": "the respective mongodb _id of the user"
}
```

Response: User Balance if found.

### Generate Referral Link

- **Endpoint:** `/api/referral/generate`
- **Method:** POST

Request Body:

## In the Authorization tab in Bearer section ,paste the token of this user who is referring other 5 users

```json
{
  "userId": "the respective mongodb _id of the user"
}
```

### Expire Referral Link

- **Endpoint:** `/api/referral/expire`
- **Method:** POST

Request Body:

## In the Authorization tab in Bearer section ,paste the token of this user who is referring other 5 users

### This can only be expired after 5 days (I have set this) or after the referral link has been used by 5 other people

```json
{
  "userId": "the respective mongodb _id of the user"
}
```

### Verify Referred Link

- **Endpoint:** `/api/referral/verify`
- **Method:** POST

Request Body:

## In the Authorization tab in Bearer section ,paste the token of the user who is getting referred

```json
{
  "code": "The code received from the /api/referral/generate endpoint"
}
```
