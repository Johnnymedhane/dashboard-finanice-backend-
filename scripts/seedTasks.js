import { connectDB, disconnectDB } from '../config/db.js';
import Task from '../models/tasks.js';

const seedData = [
	{ title: 'Review monthly budget', completed: false, progress: 35 },
	{ title: 'Reconcile last week transactions', completed: false, progress: 55 },
	{ title: 'Pay electricity bill', completed: true, progress: 100 },
	{ title: 'Pay internet subscription', completed: true, progress: 100 },
	{ title: 'Update savings goal for Q1', completed: false, progress: 20 },
	{ title: 'Categorize uncategorized expenses', completed: false, progress: 10 },
	{ title: 'Export transactions to CSV', completed: true, progress: 100 },
	{ title: 'Plan next month groceries budget', completed: false, progress: 65 },
	{ title: 'Check credit card statement', completed: false, progress: 40 },
	{ title: 'Set reminders for recurring payments', completed: true, progress: 100 },
	{ title: 'Verify income sources for last quarter', completed: false, progress: 15 },
	{ title: 'Create emergency fund checklist', completed: false, progress: 5 },
	{ title: 'Audit subscriptions and cancel unused', completed: false, progress: 70 },
	{ title: 'Update dashboard categories', completed: true, progress: 100 },
	{ title: 'Backup database snapshot', completed: true, progress: 100 },
	{ title: 'Prepare tax documents folder', completed: false, progress: 25 }
];

function normalizeTask(task) {
	const completed = Boolean(task.completed);
	const progress = Number.isFinite(task.progress) ? task.progress : 0;
	return {
		title: String(task.title).trim(),
		completed,
		progress: completed ? 100 : Math.max(0, Math.min(99, Math.round(progress)))
	};
}

async function seed() {
	try {
		await connectDB();

		const deleteAllExisting = await Task.deleteMany({});
		console.log(`Deleted ${deleteAllExisting.deletedCount} existing tasks.`);

		const inserted = await Task.insertMany(seedData.map(normalizeTask));
		console.log(`Inserted ${inserted.length} tasks.`);
	} catch (err) {
		console.error('Seeding error:', err);
		process.exitCode = 1;
	} finally {
		await disconnectDB();
	}
}

seed();
