import { connectDB, disconnectDB } from '../config/db.js';
import Transaction from '../models/transactions.js';

const seedData = [
  {
    type: 'income',
    amount: 5000,
    description: 'Monthly salary',
    category: 'salary',
    status: 'completed',
    date: new Date('2026-02-01T09:00:00Z')
  },
  {
    type: 'income',
    amount: 1200,
    description: 'Contract payment',
    category: 'freelance',
    status: 'completed',
    date: new Date('2026-02-05T12:00:00Z')
  },
  {
    type: 'expense',
    amount: 200,
    description: 'Groceries',
    category: 'food',
    status: 'completed',
    date: new Date('2026-02-06T17:30:00Z')
  },
  {
    type: 'income',
    amount: 2500,
    description: 'Bonus payment',
    category: 'salary',
    status: 'completed',
    date: new Date('2026-02-07T10:00:00Z')
  },
  {
    type: 'expense',
    amount: 75,
    description: 'Taxi',
    category: 'transport',
    status: 'completed',
    date: new Date('2026-02-08T20:00:00Z')
  }
];

async function seed() {
  try {
    await connectDB();
    const inserted = await Transaction.insertMany(seedData);
    console.log(`Inserted ${inserted.length} transactions.`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await disconnectDB();
  }
}

seed();
