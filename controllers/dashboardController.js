

import * as dashboardService from "../services/dashboardService.js";


// Get dashboard data with optional time filter (weekly, monthly, yearly)
export async function getDashboardDataController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }
    const filter = req.query.filter || "monthly";
    const data = await dashboardService.getDashboardData(filter, userId);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Dashboard controller error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
