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
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
  };

  return (
    <div
      style={{ height: "70vh" }}
      className="bg-white shadow-md rounded-lg w-full p-4"
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
