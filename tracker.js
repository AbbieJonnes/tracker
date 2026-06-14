import { Expense } from './Expense.js'; // Imports the Expense class from another file

export class Tracker { // Creates and exports the Tracker class

    constructor() { // Runs automatically when a Tracker object is created

        this.expenses = JSON.parse(localStorage.getItem('expenses') || '[]'); // Loads saved expenses from localStorage or creates an empty array

        this.currentFilter = 'All'; // Stores the currently selected filter category

    }

    addExpense(description, amount, category) { // Adds a new expense

        const newExpense = new Expense( // Creates a new Expense object

            description, // Stores the description

            amount, // Stores the amount

            category // Stores the category

        );

        this.expenses = [...this.expenses, newExpense]; // Uses spread operator to create a new array with the new expense added

        this.saveToLocalStorage(); // Saves updated expenses to localStorage

        return newExpense; // Returns the newly created expense

    }

    removeExpense(id) { // Removes an expense using its id

        this.expenses = this.expenses.filter( // Creates a new array

            expense => expense.id !== id // Keeps all expenses except the selected one

        );

        this.saveToLocalStorage(); // Saves updated expenses

    }

    calculateTotal(filteredExpenses = this.expenses) { // Calculates total amount

        return filteredExpenses.reduce( // Uses reduce to combine all amounts

            (sum, expense) => sum + expense.amount, // Adds current amount to running total

            0 // Starting value

        );

    }

    getFilteredExpenses() { // Returns expenses based on selected category

        if (this.currentFilter === 'All') { // Checks if all expenses should be shown

            return this.expenses; // Returns entire expense list

        }

        return this.expenses.filter( // Creates filtered array

            expense => expense.category === this.currentFilter // Matches selected category

        );

    }

    saveToLocalStorage() { // Saves expenses

        localStorage.setItem( // Stores data

            'expenses', // Storage key

            JSON.stringify(this.expenses) // Converts array into JSON string

        );

    }

}