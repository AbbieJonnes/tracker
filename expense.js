export class Expense { // Exports the Expense class so it can be imported into other files

    constructor(description, amount, category) { // Runs whenever a new Expense object is created

        this.id = Date.now().toString() + Math.random().toString(36).slice(2, 5); // Creates a unique ID using timestamp and random characters

        this.description = description; // Stores the expense description

        this.amount = parseFloat(amount); // Converts amount into a decimal number and stores it

        this.category = category; // Stores the expense category

        this.date = new Date().toLocaleDateString(); // Stores the current date in a readable format

    } // Ends constructor

} // Ends Expense class