import { Tracker } from './tracker.js'; // Imports the Tracker class (handles all expense logic)

// Creates a new instance of Tracker to manage all expenses in this app
const tracker = new Tracker();

// --- GET ALL DOM ELEMENTS (CONNECT JS TO HTML UI) ---

const form = document.getElementById('expense-form'); // Form used to submit new expenses
const descInput = document.getElementById('desc-input'); // Input field for expense description
const amountInput = document.getElementById('amount-input'); // Input field for expense amount
const categoryInput = document.getElementById('category-input'); // Dropdown for category selection
const expenseList = document.getElementById('expense-list'); // Table body where expenses are displayed
const totalAmount = document.getElementById('total-amount'); // Element that shows total expenses
const filterSelect = document.getElementById('filter-category'); // Dropdown used to filter expenses
const emptyState = document.getElementById('empty-state'); // Message shown when no expenses exist

// --- RENDER FUNCTION (UPDATES THE UI EVERY TIME DATA CHANGES) ---
const render = () => {

    const expenses = tracker.getFilteredExpenses(); // Gets either all or filtered expenses

    expenseList.innerHTML = ''; // Clears the table before re-rendering (prevents duplicates)

    // If there are no expenses, show "No expenses found"
    if (expenses.length === 0) {
        emptyState.classList.remove('hidden'); // Show empty state message
    } else {
        emptyState.classList.add('hidden'); // Hide empty state message

        // Loop through each expense and display it in the table
        expenses.forEach(expense => {

            const tr = document.createElement('tr'); // Create a new table row

            // Fill the row with expense data using template literals
            tr.innerHTML = `
                <td class="px-4 py-3">${expense.description}</td> <!-- Expense description -->
                <td class="px-4 py-3">${expense.category}</td> <!-- Expense category -->
                <td class="px-4 py-3">$${expense.amount.toFixed(2)}</td> <!-- Expense amount formatted -->
                <td class="px-4 py-3 text-right">
                    <button data-id="${expense.id}" class="delete-btn text-red-500 hover:text-red-700">
                        Delete
                    </button> <!-- Delete button for each expense -->
                </td>
            `;

            expenseList.appendChild(tr); // Add row to table body

        });
    }

    // Calculate total of all currently displayed expenses
    const total = tracker.calculateTotal(expenses);

    // Update total amount display in UI
    totalAmount.textContent = `$${total.toFixed(2)}`;
};

// --- ADD EXPENSE EVENT ---
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh when form is submitted

    tracker.addExpense(
        descInput.value, // Get description from input
        Number(amountInput.value), // Convert amount to number (VERY IMPORTANT)
        categoryInput.value // Get selected category
    );

    form.reset(); // Clear form fields after submission

    render(); // Refresh UI so new expense appears
});

// --- DELETE EXPENSE EVENT (EVENT DELEGATION) ---
expenseList.addEventListener('click', (e) => {

    // Check if the clicked element is a delete button
    if (e.target.classList.contains('delete-btn')) {

        const id = e.target.dataset.id; // Get expense ID from button

        tracker.removeExpense(id); // Remove expense from tracker

        render(); // Re-render UI after deletion

    }

});

// --- FILTER EXPENSES ---
filterSelect.addEventListener('change', (e) => {

    tracker.currentFilter = e.target.value; // Update current filter category

    render(); // Re-render UI with filtered results

});

// --- INITIAL PAGE LOAD ---
render(); // Display saved expenses when page loads