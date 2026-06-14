import { Tracker } from './tracker.js'; // Imports Tracker class from tracker file

// --- MOCK LOCALSTORAGE FOR NODE/JEST ---
const localStorageMock = (() => { // Creates fake localStorage for Node testing

    let store = {}; // Temporary storage container

    return { // Mocked localStorage methods

        getItem: (key) => store[key] || null, // Get value by key

        setItem: (key, value) => { store[key] = value.toString(); }, // Save value

        clear: () => { store = {}; }, // Clear all data

        removeItem: (key) => { delete store[key]; } // Remove one item

    };

})(); // Immediately invoke mock function

// Replace real localStorage with mock version
Object.defineProperty(global, 'localStorage', {
    value: localStorageMock
});

describe('Tracker Class Unit Tests', () => { // Test suite for Tracker

    let tracker; // Declare tracker instance

    beforeEach(() => { // Runs before every test

        localStorage.clear(); // Reset storage

        tracker = new Tracker(); // Fresh instance

    });

    test('should add an expense correctly', () => { // Add expense test

        const item = tracker.addExpense('Coffee', 4.50, 'Food'); // Add expense (use number not string)

        expect(tracker.expenses.length).toBe(1); // Check array length

        expect(tracker.expenses[0].description).toBe('Coffee'); // Check description

        expect(tracker.expenses[0].amount).toBe(4.50); // Check amount

        expect(tracker.expenses[0].category).toBe('Food'); // Check category

        expect(item).toHaveProperty('id'); // Ensure ID exists

    });

    test('should calculate total correctly', () => { // Total test

        tracker.addExpense('Lunch', 15.00, 'Food'); // First expense

        tracker.addExpense('Gas', 30.00, 'Transport'); // Second expense

        tracker.addExpense('Movie', 12.50, 'Entertainment'); // Third expense

        const total = tracker.calculateTotal(); // Calculate total

        expect(total).toBe(57.50); // Expect correct sum

    });

    test('should remove expense by id', () => { // Remove test

        const item1 = tracker.addExpense('Book', 20.00, 'Other'); // Add first

        const item2 = tracker.addExpense('Subway', 5.00, 'Transport'); // Add second

        tracker.removeExpense(item1.id); // Remove first item

        expect(tracker.expenses.length).toBe(1); // One remains

        expect(tracker.expenses[0].id).toBe(item2.id); // Correct item remains

    });

    test('should filter expenses by category', () => { // Filter test

        tracker.addExpense('Burger', 10.00, 'Food'); // Food

        tracker.addExpense('Bus fare', 2.50, 'Transport'); // Transport

        tracker.currentFilter = 'Food'; // Set filter

        const result = tracker.getFilteredExpenses(); // Get filtered

        expect(result.length).toBe(1); // Only one item

        expect(result[0].description).toBe('Burger'); // Correct item

    });

    test('should persist data in localStorage', () => { // Persistence test

        tracker.addExpense('Gym Membership', 50.00, 'Other'); // Add item

        const newTracker = new Tracker(); // Simulate refresh

        expect(newTracker.expenses.length).toBe(1); // Data persisted

        expect(newTracker.expenses[0].description).toBe('Gym Membership'); // Correct data

    });

});