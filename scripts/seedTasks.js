
import { connectDB, disconnectDB } from "../config/db.js";
import Task from "../models/tasks.js";




  const raw = [
    { title: "Buy groceries", date: "2026-01-27T09:15:00.000Z", completed: false, progress: 0 },
    { title: "Pay rent", date: "2026-01-31T18:00:00.000Z", completed: true, progress: 100 },
    { title: "Review monthly budget", date: "2026-02-01T08:00:00.000Z", completed: false, progress: 35 },
    { title: "Call insurance", date: "2026-02-05T14:30:00.000Z", completed: false, progress: 10 },
    { title: "Submit tax documents", date: "2026-02-10T12:00:00.000Z", completed: false, progress: 50 },
    { title: "Gym session", date: "2026-02-15T06:30:00.000Z", completed: true, progress: 100 },
    { title: "Plan weekend expenses", date: "2026-02-20T19:45:00.000Z", completed: false, progress: 20 },
    { title: "Pay utilities", date: "2026-02-25T16:10:00.000Z", completed: false, progress: 0 },
    { title: "Renew subscription", date: "2026-02-27T00:53:22.687Z", completed: false, progress: 50 },
    { title: "Close month report", date: "2026-02-28T23:15:00.000Z", completed: false, progress: 60 },
    { title: "Set savings goal", date: "2026-03-01T10:00:00.000Z", completed: false, progress: 5 },
    { title: "Quarterly review", date: "2026-03-15T11:20:00.000Z", completed: false, progress: 0 },
  ];

  

async function seed() {
  try {
    await connectDB();
    const deleted = await Task.deleteMany({});
    console.log(`Deleted ${deleted.deletedCount} existing tasks.`);
    const inserted = await Task.insertMany(raw);
    console.log(`Inserted ${inserted.length} tasks.`);
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await disconnectDB();
  }
}

seed();