
import * as dashboardRepositories from "../repositories/dashboardRepository.js";
import { subDays } from "date-fns";

// Get dashboard data with optional time filter (weekly, monthly, yearly)
export async function getDashboardData(filter, userId) {
  let startDate;

  if (filter === "weekly") {
    startDate = subDays(new Date(), 7);
  } else if (filter === "monthly") {
    startDate = subDays(new Date(), 30);
  } else if (filter === "yearly") {
    startDate = subDays(new Date(), 365);
  } else if (filter === "overall") {
    startDate = new Date(0); 
  }

  const total = await dashboardRepositories.getDashboardData(
    startDate,
    userId
  );



  const income = total.find(d => d._id === "income")?.total || 0;
  const expense = total.find(d => d._id === "expense")?.total || 0;
  
  const pendingTasks = await dashboardRepositories.getPendingtasks(userId);



  return {
    income,
    expense,
    balance: income - expense,
    pendingTasks
    
  };
}
