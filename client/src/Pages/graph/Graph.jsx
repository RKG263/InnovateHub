import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./graph.css";

const Graph = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Expenses",
        data: [65, 70, 75, 85, 90, 95, 105],
        fill: false,
        backgroundColor: "rgba(255, 0, 0, 1)",
        borderColor: "rgba(255, 0, 0, 1)",
      },
      {
        label: "Sales",
        data: [0, 20, 40, 70, 95, 120, 155],
        fill: false,
        backgroundColor: "rgba(0, 255, 0,1)",
        borderColor: "rgba(0, 255, 0,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Model",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months ->",
        },
      },
      y: {
        title: {
          display: true,
          text: "Rupees in Lakhs ->",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
