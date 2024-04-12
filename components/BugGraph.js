"use client";

import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { db } from "@/lib/db";

const BugGraph = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchBugData = async () => {
      try {
        // Fetch data from your database to populate the graph
        const { data } = await db.from("reports").select("*");

        // Process the data to prepare for the graph
        const labels = data.map((report) => report.bugType);
        const bugCounts = data.map((report) => report.status);

        // Create chart
        const ctx = document.getElementById("bugChart");
        const newChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Bugs per Sprint",
                data: bugCounts,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        setChart(newChart);
      } catch (error) {
        console.error("Error fetching bug data:", error.message);
      }
    };

    fetchBugData();

    // Cleanup
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  });

  return <canvas id="bugChart" width="400" height="200"></canvas>;
};

export default BugGraph;
