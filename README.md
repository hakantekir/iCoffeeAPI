# iCoffee

iCoffeeAPI is a RESTful API built with Node.js and Express, along with MySQL for data storage. The API enables users to place coffee orders from the comfort of their own homes.

# Getting Started

To get started, you will need to have Node.js installed on your machine. You can download it here: https://nodejs.org/en/download/

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Dump the database schema into your MySQL server.
4. Create a `.env` file in the root directory and add the following environment variables:
```
DB_HOST
DB_USER
DB_PASS
DB_NAME
```
5. Run `npm start` to start the server.

# Endpoints

### Authentication
POST /auth/signup
POST /auth/signin

### Address

GET /address/:id\
POST /address/:id

### Coffee
GET /coffee

### Cart

GET /cart/:id\
POST /cart/:id\
PATCH /cart/:id\
DELETE /cart/:id\
GET /cart/details/:id

### Order

POST /order/:id&:addressId\
POST /order/:id

# License

This project is licensed under the MIT License - see the LICENSE.md file for details