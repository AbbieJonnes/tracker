import { Tracker } from './Tracker.js'; // Imports Tracker class from Tracker file

// --- MOCK LOCALSTORAGE FOR NODE/JEST ---
const localStorageMock = (() => { // Creates a localStorage for testing environment

    let store = {}; // Temporary storage object for key-value pairs

    return { // Returns mocked localStorage methods

        getItem: (key) => store[key] || null, // Retrieves stored value by key or null if not found

        setItem: (key, value) => { store[key] = value.toString(); }, // Saves value as string in mock storage

        clear: () => { store = {}; }, // Clears all stored data

        removeItem: (key) => { delete store[key]; } // Deletes a specific key from storage

    };

})(); // Immediately executes function to create mock localStorage

// Inject the mock into the global Node environment before tests run
Object.defineProperty(global, 'localStorage', { value: localStorageMock }); // Replaces real localStorage with mock version

describe('Tracker Class Unit Tests', () => { // Groups all Tracker-related tests

    let tracker; // Declares tracker variable for reuse in tests

    beforeEach(() => { // Runs before each test case

        localStorage.clear(); // Clears mock storage to ensure clean test state

        tracker = new Tracker(); // Creates a new Tracker instance for isolation

    });

    test('should add an expense cleanly and update state array', () => { // Tests adding expense functionality

        const item = tracker.addExpense('Coffee', '4.50', 'Food'); // Adds a sample expense

        expect(tracker.expenses.length).toBe(1); // Checks if expense was added

        expect(tracker.expenses[0].description).toBe('Coffee'); // Checks description correctness

        expect(tracker.expenses[0].amount).toBe(4.5); // Checks amount conversion to number

        expect(tracker.expenses[0].category).toBe('Food'); // Checks category correctness

        expect(item).toHaveProperty('id'); // Ensures expense has unique ID

    });

    test('should correctly sum all structured values using reduce', () => { // Tests total calculation

        tracker.addExpense('Lunch', '15.00', 'Food'); // Adds first expense

        tracker.addExpense('Gas', '30.00', 'Transport'); // Adds second expense

        tracker.addExpense('Movie', '12.50', 'Entertainment'); // Adds third expense

        const total = tracker.calculateTotal(); // Calculates total expenses

        expect(total).toBe(57.50); // Verifies correct sum

    });

    test('should slice items out dynamically by ID matching references', () => { // Tests delete functionality

        const item1 = tracker.addExpense('Book', '20.00', 'Other'); // Adds first expense

        const item2 = tracker.addExpense('Subway', '5.00', 'Transport'); // Adds second expense

        tracker.removeExpense(item1.id); // Removes first expense by ID

        expect(tracker.expenses.length).toBe(1); // Ensures only one remains

        expect(tracker.expenses[0].id).toBe(item2.id); // Confirms correct item remains

    });

    test('should properly filter entries without destructive structural mutation', () => { // Tests filtering logic

        tracker.addExpense('Burger', '10.00', 'Food'); // Adds food expense

        tracker.addExpense('Bus fare', '2.50', 'Transport'); // Adds transport expense

        tracker.currentFilter = 'Food'; // Sets filter to Food category

        const targetedArray = tracker.getFilteredExpenses(); // Gets filtered results

        expect(targetedArray.length).toBe(1); // Ensures only food items remain

        expect(targetedArray[0].description).toBe('Burger'); // Confirms correct filtering

    });

    test('should preserve historical state values accurately in window.localStorage storage layers', () => { // Tests persistence

        tracker.addExpense('Gym Membership', '50.00', 'Other'); // Adds expense

        const persistentTracker = new Tracker(); // Simulates page refresh by creating new instance

        expect(persistentTracker.expenses.length).toBe(1); // Checks if data persisted

        expect(persistentTracker.expenses[0].description).toBe('Gym Membership'); // Confirms stored value

    });

});