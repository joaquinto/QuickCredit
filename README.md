# QuickCredit    [![Build Status](https://travis-ci.org/joaquinto/QuickCredit.svg?branch=develop)](https://travis-ci.org/joaquinto/QuickCredit)   [![Coverage Status](https://coveralls.io/repos/github/joaquinto/serverCode/badge.svg)](https://coveralls.io/github/joaquinto/serverCode)  [![Maintainability](https://api.codeclimate.com/v1/badges/f4f3acbe35458f70e37c/maintainability)](https://codeclimate.com/github/joaquinto/QuickCredit/maintainability)
Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

___

**Features Implemented**
1. User sign up.
2. User sign in.
3. User can apply for a loan.
4. User can view all loan repayment history.
5. User can reset password
6. Admin can mark a client as verified after confirming the client’s work or home
address.
7. Admin can view all loan applications.
8. Admin can view a specific loan application.
9. Admin can view current loans (not fully repaid).
10. Admin can view all repaid loans.
11. Admin can approve or reject a client’s loan application.
12. Admin can post loan repayment transaction in favour of a client.
___

## Templates
UI Templates for this application are live on [Github Pages](https://joaquinto.github.io/QuickCredit/UI/)

___

## Technologies Used
* [Node.js](https://nodejs.org/en/) - A runtime environment based off of Chromes's V8 Engine for writing Javascript server-side applications.
* [Express.js](https://expressjs.com/) - Web application framework based on Node.js.
* [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
* [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.

___


## Testing Tools
* [Mocha](https://mochajs.org/) - A JavaScript test framework.
* [Chai](https://www.chaijs.com/) - A test assertion library for JavaScript.
* [Chai-Http](https://www.npmjs.com/package/chai-http) - A module that provides high-level abstraction for HTTP testing.

___

## API Information
The API endpoints are hosted on Heroku - [Quick Credit](https://quickycredit.herokuapp.com/)

|METHOD  |DESCRIPTION                        |ENDPOINT                                  |
|------- |-----------------------------------|------------------------------------------|
|POST    |Sign Up                            |/api/v1/auth/signup                        |
|POST    |Sign In                            |/api/v1/auth/signin                        |
|PATCH    |Mark a user as verified           |/api/v1/users/:email/verify                         |
|DELETE   | Delete a user           | /api/v1/users/:email  |
|POST    | Send a password reset link        | /api/v1/reset-password  |
|GET    | Reset password view                | /api/v1/users/:email/:token/reset-password   |
|PATCH   | Reset password                    | /api/v1/users/:email/:token/reset-password   |
|POST    | Create a loan application         | /api/v1/loans      |
|GET     | Get a specific loan application   |/api/v1/loans/:id    |
|GET     | Get all current loans that are not fully repaid | /api/v1/loans?status=approved&repaid=false  |
|GET     | Get all repaid loans              | /api/v1/loans?status=approved&repaid=true   |
|GET     | Get all loan applications         | /api/v1/loans         |
|GET     | View loan repayment history       | /api/v1/loans/:id/repayments  |
|PATCH   | Approve or reject a loan application  | /api/v1/loans/:id    |
|POST    | Create a loan repayment record    | /api/v1/loans/:id/repayment   |





|DESCRIPTION         |REQUIRED FIELDS                                                    |                 
|--------------------|-------------------------------------------------------------------|
|Sign Up             |firstname, lastname, email, password, address                               |
|Sign In             |email, password                                                    |
|Mark a user as verified| status   |
|Send a password reset link | email   |
|Reset password   | password   |
|Create a loan application  |  firstname, lastname, email, tenor, amount |
|Approve or reject a loan application |  status   |
|Create a loan repayment record  | paid_amount  |


___
## The Endpoints can be accessed remotely or locally.

#### Accessing the endpoints remotely via POSTMAN
You will need to have [POSTMAN](https://www.getpostman.com/downloads/) app installed on your computer.

##### Example 
###### Sign In
1. Launch POSTMAN
2. Click the dropdown menu to the left of the URL bar and select POST as a method.
3. To access the Sign In endpoint, at the end of Quick Credit's URL attach the sign in endpoint to it as seen in step 4
4. https://quickycredit.herokuapp.com/api/v1/auth/signin 
5. Then paste the full URL in the URL bar.
6. Click 'Body' tab below the URL, then select x-www-form-urlencoded radio button.
7. Fill in the required fields correctly.
8. Click the blue Send button to the right of the URL bar.
9. And wait for a response below.


#### Accessing the endpoints locally via POSTMAN

1. On the terminal of your computer, navigate into the cloned repo's folder
2. Click [npm](https://www.npmjs.com/get-npm) and [Node.js](https://nodejs.org/en/) to get npm and node respectively.
3. Clone Banka repo `https://github.com/joaquinto/QuickCredit.git` on your local machine.
4. Run `$ npm install` to install All of Quick Credit's dependencies.
5. Run `$ npm start` to power up the server.
6. The procedure for using POSTMAN here is the same as when accessing the endpoint remotely except that you make use of http://localhost:3000 as the full URL's prefix in place of the app's URL on heroku
e.g To access Sign In endpoint you will have a full URL like http://localhost:3000/api/v1/auth/signin

#### Test
You can locally run the test by running `npm test` in the cloned repo directory opened in a new terminal window while the server runs on the first window. It is important that the server is running for the tests to pass.

___

## Author
### Odjegba Jonathan (Joaquinto)



