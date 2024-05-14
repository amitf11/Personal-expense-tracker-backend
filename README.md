# Personal Expense Tracker Application



## Overview
This project aims to build a simple yet functional personal expense tracker that enables users to input, categorize, and visualize their expenses over time. It includes front-end and back-end components.
## Front-end 
#### User Interface

  Add New Expense: Users can input details such as amount, category (e.g., Food, Transport, Utilities) and date.

  View Expenses: A list of all entered expenses is displayed.

  Filtering: Users can filter expenses by category and date.

  Visualization: Expenses are visualized in a pie chart to show spending distribution by category. (under 'statistics button')

  Find repository here: https://github.com/amitf11/Personal-Expense-Tracker
## Back-end
#### Server
RESTful API: Developed using Node.js with Express to handle front-end requests.

Database: MongoDB used for storing and retrieving user data.

API Endpoints

POST /api/expense: Add a new expense.

GET /api/expense: Retrieve all expenses.

PUT /api/expense/:id: Update an expense.

DELETE /api/expense/:id: Delete an expense.

Security

Basic Authentication: Implemented to protect user data and ensure proper authorization.
## Additional Features

User Authentication: Allows users to create accounts and securely manage expenses.

Advanced Filtering: Includes filters for viewing expenses by custom date range.

Mobile Responsiveness: Ensured application is responsive and works well on all devices.
## Setup Instructions

Clone the repository: git clone https://github.com/amitf11/Personal-expense-tracker-backend

Install dependencies: npm install
Start the server: npm start

Access the application at http://127.0.0.1:3030
Log in with: 

amit@gmail.com - Password: 123 (Or sign up)
