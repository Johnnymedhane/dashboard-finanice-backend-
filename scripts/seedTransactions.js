import { connectDB, disconnectDB } from '../config/db.js';
import Transaction from '../models/transactions.js';


// Add more varied transactions across weeks, months and years
const seedData = [
  // 2026 entries
  { type: 'income', amount: 4000, description: 'Monthly salary', category: 'salary', status: 'completed', date: new Date('2026-01-01T09:00:00Z') },
  { type: 'expense', amount: 120, description: 'Dinner', category: 'food', status: 'completed', date: new Date('2026-01-15T19:00:00Z') },
  { type: 'income', amount: 1500, description: 'Side gig', category: 'freelance', status: 'completed', date: new Date('2026-03-20T14:00:00Z') },
  { type: 'expense', amount: 300, description: 'Car repair', category: 'auto', status: 'completed', date: new Date('2026-04-05T10:00:00Z') },

  // 2025 entries
  { type: 'income', amount: 4500, description: 'Salary', category: 'salary', status: 'completed', date: new Date('2025-06-01T09:00:00Z') },
  { type: 'expense', amount: 250, description: 'Groceries', category: 'food', status: 'completed', date: new Date('2025-06-08T18:30:00Z') },
  { type: 'expense', amount: 60, description: 'Internet bill', category: 'utilities', status: 'completed', date: new Date('2025-07-02T08:00:00Z') },
  { type: 'income', amount: 200, description: 'Gift', category: 'other', status: 'completed', date: new Date('2025-07-20T12:00:00Z') },

  // 2024 entries (different months/weeks)
  { type: 'income', amount: 3800, description: 'Salary', category: 'salary', status: 'completed', date: new Date('2024-11-01T09:00:00Z') },
  { type: 'expense', amount: 140, description: 'Groceries', category: 'food', status: 'completed', date: new Date('2024-11-10T17:00:00Z') },
  { type: 'income', amount: 600, description: 'Freelance', category: 'freelance', status: 'completed', date: new Date('2024-09-15T15:00:00Z') },
  { type: 'expense', amount: 90, description: 'Taxi', category: 'transport', status: 'completed', date: new Date('2024-10-03T21:00:00Z') },

  // 2023 entries (past year)
  { type: 'income', amount: 3200, description: 'Salary', category: 'salary', status: 'completed', date: new Date('2023-02-01T09:00:00Z') },
  { type: 'expense', amount: 400, description: 'Rent', category: 'housing', status: 'completed', date: new Date('2023-02-05T08:00:00Z') },
  { type: 'expense', amount: 45, description: 'Coffee', category: 'food', status: 'completed', date: new Date('2023-03-12T09:30:00Z') },
  { type: 'income', amount: 500, description: 'Tax refund', category: 'other', status: 'completed', date: new Date('2023-04-10T10:00:00Z') },

  // Mixed weekly variations
  { type: 'expense', amount: 25, description: 'Lunch', category: 'food', status: 'completed', date: new Date('2026-02-02T12:30:00Z') },
  { type: 'expense', amount: 50, description: 'Groceries', category: 'food', status: 'completed', date: new Date('2026-01-29T17:00:00Z') },
  { type: 'income', amount: 1000, description: 'Freelance sprint', category: 'freelance', status: 'completed', date: new Date('2025-12-15T11:00:00Z') },
  { type: 'expense', amount: 600, description: 'New laptop', category: 'electronics', status: 'completed', date: new Date('2024-12-20T10:00:00Z') },
  { type: 'income', amount: 2500, description: 'Salary adjustment', category: 'salary', status: 'completed', date: new Date('2024-08-01T09:00:00Z') }
];



async function seed() {
  try {
    await connectDB();
    const deletAllExisting = await Transaction.deleteMany({});
    console.log(`Deleted ${deletAllExisting.deletedCount} existing transactions.`);
    
    const inserted = await Transaction.insertMany(seedData);
    console.log(`Inserted ${inserted.length} transactions.`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await disconnectDB();
  }
}

seed();
