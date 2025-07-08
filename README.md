"# emp-simpal-crud-app-" 

# 🧑‍💼 Employee Management CRUD App

A full-stack **Employee Management System** using **Node.js**, **Express.js**, **MongoDB**, and **EJS** that performs basic **CRUD operations** (Create, Read, Update, Delete) on employee records.

## 🔧 Features

- Add new employees with name, email, phone, and job details.
- View a complete list of employees.
- Edit employee data.
- Delete employee records.
- Show alert messages after actions using EJS + Bootstrap modal.
- Responsive design using Bootstrap.

## 🛠️ Tech Stack

| Layer       | Technology             |
|-------------|-------------------------|
| Backend     | Node.js, Express.js     |
| Frontend    | EJS, HTML, Bootstrap    |
| Database    | MongoDB + Mongoose      |
| Templating  | EJS                     |
| Others      | Express Router, MVC     |

## 📁 Folder Structure

employee-crud-app/
├── controllers/ # Route logic
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── views/ # EJS templates
│ ├── partials/ # Reusable EJS parts (header, footer)
│ └── index.ejs # Main UI
├── app.js # Entry point
├── .env # Environment variables
└── package.json


## ⚙️ Setup Instructions

### 1. Clone the repository


## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mananmkgithub/emp-simpal-crud-app-.git
cd employee-crud-app

npm install

Create a .env file and add your MongoDB URI:
MONGODB_URI=mongodb://localhost:27017/employeeDB
PORT=3000

Run the app
npm start


