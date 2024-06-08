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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const colors = [
  "#006B63",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FFCD56",
  "#4D5360",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
];

const StackedBarCharts = ({ data }) => {
  // Extract unique crew names
  const crewNames = Array.from(new Set(data.flatMap(m => m.crews.map(c => c.crew))));

  const chartData = {
    labels: data.map(m => m.month),
    datasets: crewNames.map((crew, index) => ({
      label: crew,
      data: data.map(monthData => {
        const crewData = monthData.crews.find(c => c.crew === crew);
        return crewData ? crewData.ratio : 0;
      }),
      backgroundColor: colors[index % colors.length],
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        ticks: {
          color: "white",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        stacked: false,
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          display: typeof data.home === "undefined" ? false : true,
          color: "white",
          font: {
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FAF0E6",
        },
        display: true,
      },
      datalabels: {
        display: true,
        color: "#FFFAD7",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: value => value.toFixed(0),
        anchor: "end",
        align: "start",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StackedBarCharts;
