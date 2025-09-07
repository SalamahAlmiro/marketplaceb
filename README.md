**MarketplaceB** is the backend API for the NightMarkt marketplace application.

---

##  Stack

- **Node.js** with **Express**  
- **MySQL** for data storage  
- **JWT** for authentication  
- **bcrypt** for password hashing  
- **Joi** for request validation

---

##  Features

- **User authentication**: register, login, logout with JWT-based session  
- **Product CRUD**: create, read, update, delete products (protected routes for authenticated users)  
- **Input validation** using Joi to prevent bad data  
- **Token-protected routes** via middleware  
- **Error handling** for duplicate user/email, invalid credentials, and missing products  

---

##  Getting Started

###  Prerequisites

- Node.js (v16+)
- MySQL (running locally or remote)
- [Optional] Postman for testing API endpoints

###  Setup steps

1. Clone the repo:
   git clone https://github.com/SalamahAlmiro/marketplaceb.git
   cd marketplaceb
2. Install dependencies:
  npm install
3. Copy .env.example to .env and configure:
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=your_password
  DB_NAME=marketplace
  JWT_SECRET=your_secret_key
  JWT_EXPIRATION=1h
4. Set up the database, run the SQL script or create the schema manually
5. Start the server user npm start
