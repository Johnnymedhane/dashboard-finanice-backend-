

import * as dashboardService from "../services/dashboardService.js";


// Get dashboard data with optional time filter (weekly, monthly, yearly)
export async function getDashboardDataController(req, res) {
  try {
    const filter = req.query.filter || "monthly";
    const data = await dashboardService.getDashboardData(filter);
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
