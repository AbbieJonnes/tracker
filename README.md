# Expense Tracker (Apex Expense)

A simple and interactive Expense Tracker built using HTML, Tailwind CSS, and JavaScript.  
It allows users to add, view, filter, and delete expenses while keeping data stored in the browser using LocalStorage.

## Features

- Add new expenses (description, amount, category)
- View all recorded expenses in a table
- Delete expenses dynamically
- Filter expenses by category
- Automatically calculate total expenses
- Persistent storage using LocalStorage
- Responsive UI using Tailwind CSS

## Tech Stack

- HTML5 (structure)
- Tailwind CSS (styling)
- JavaScript (logic)
- LocalStorage (data persistence)
- Jest (unit testing)

## Project Structure


expense-tracker/
│
├── index.html # Main UI
├── app.js # DOM logic + event handling (controller)
├── tracker.js # Tracker class (business logic)
├── expense.js # Expense model class
├── trackertest.js # Jest unit tests
├── package.json # Project config & dependencies
└── README.md # Project documentation


## How It Works

### 1. Add Expense
- User enters description, amount, and category
- Expense is created using the Expense class
- Stored inside Tracker

### 2. Display Expenses
- render() function updates the UI dynamically
- Expenses are displayed in a table

### 3. Delete Expense
- Clicking delete removes item using its unique ID
- UI updates instantly

### 4. Filter Expenses
- Users can filter by category
- Only matching items are displayed

### 5. Total Calculation
- Uses reduce() to sum all expense amounts
- Updates automatically when data changes

## LocalStorage

Expenses are saved in the browser so data is not lost after refresh.

## How to Run the Project
Clone the repository:
git clone https://github.com/AbbieJonnes/expense-tracker.git

## Author
Name: Abbie Jonnes
GitHub: https://github.com/AbbieJonnes