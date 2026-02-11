
import * as dashboardRepository from "../repositories/dashboardRepository.js";
import { subDays } from "date-fns";
// Get dashboard data with optional time filter (weekly, monthly, yearly)
export async function getDashboardData(filter) {
  let startDate;

  if (filter === "weekly") {
    startDate = subDays(new Date(), 7);
  } else if (filter === "monthly") {
    startDate = subDays(new Date(), 30);
  } else if (filter === "yearly") {
    startDate = subDays(new Date(), 365);
  }

  const total = await dashboardRepository.getDashboardData(
    startDate ? { start: startDate } : undefined
  );



  const income = total.find(d => d._id === "income")?.total || 0;
  const expense = total.find(d => d._id === "expense")?.total || 0;
  



  return {
    income,
    expense,
    balance: income - expense,
   
    
  };
}
