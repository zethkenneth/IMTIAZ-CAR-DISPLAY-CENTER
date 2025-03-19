import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ labels, values }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: values,
        backgroundColor: "rgba(255, 159, 64, 0.2)", // Light orange with transparency
        borderColor: "rgba(255, 159, 64, 1)", // Solid orange
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 15,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
        align: "start",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 30,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: (value) => {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg w-full p-4" style={{ height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
