

import * as dashboardService from "../services/dashboardService.js";



export async function getDashboardDataController(req, res) {
  try {
    const userId = req.user?.id;
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
