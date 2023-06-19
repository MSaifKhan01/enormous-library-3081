Doctor Appointment Management System
This project is a doctor appointment management system developed in Node.js using Express. The system provides an interface for users to book, cancel, and manage appointments with doctors. It also allows admin users to manage user and doctor accounts.

Features
CRUD operations for User, Doctor and Admin
Localhost setup
Requirements
Node.js >=14.x
NPM >=6.x
MongoDB
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/YourGithubUsername/DoctorAppointmentManagementSystem.git
Navigate into the project directory:
bash
Copy code
cd DoctorAppointmentManagementSystem
Install dependencies:
Copy code
npm install
Create a .env file in the root directory and fill it as shown in the .env.example file.

Start the application:

sql
Copy code
npm start
The application will be running at http://localhost:3000

Routes
User Routes
GET /users - Retrieve all users
POST /users - Create a new user
GET /users/:id - Retrieve a specific user
PUT /users/:id - Update a specific user
DELETE /users/:id - Delete a specific user
Doctor Routes
GET /doctors - Retrieve all doctors
POST /doctors - Create a new doctor
GET /doctors/:id - Retrieve a specific doctor
PUT /doctors/:id - Update a specific doctor
DELETE /doctors/:id - Delete a specific doctor
Admin Routes
GET /admins - Retrieve all admins
POST /admins - Create a new admin
GET /admins/:id - Retrieve a specific admin
PUT /admins/:id - Update a specific admin
DELETE /admins/:id - Delete a specific admin

Contributing
Vipul
Saif 
Hariom
