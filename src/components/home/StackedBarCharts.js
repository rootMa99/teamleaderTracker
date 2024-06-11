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
  "#006B63", "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#FFCD56", "#4D5360", "#FF6384", "#36A2EB", "#FFCE56",
  "#FF5733", "#C70039", "#900C3F", "#581845", "#1F618D", "#148F77",
  "#117A65", "#9A7D0A", "#6E2C00", "#A93226", "#8E44AD", "#2C3E50",
  "#D4AC0D", "#D68910", "#AF7AC5", "#5499C7", "#45B39D", "#52BE80",
  "#CD6155", "#CB4335", "#B03A2E", "#76448A", "#6C3483", "#2980B9",
  "#1F618D", "#117A65", "#239B56", "#F39C12", "#D68910", "#BA4A00",
  "#A04000", "#6E2C00", "#196F3D", "#145A32", "#0B5345", "#641E16",
  "#512E5F", "#154360", "#1A5276", "#7D6608", "#6E2C00"
];
const crewColorMap = {};

const getCrewColor = (crewName, index) => {
  if (!crewColorMap[crewName]) {
    crewColorMap[crewName] = colors[index % colors.length];
  }
  return crewColorMap[crewName];
};

const StackedBarCharts = ({ data }) => {
  const allCrews = Array.from(new Set(data.flatMap(monthData => monthData.crews.map(crew => crew.crew))));

  const chartData = {
    labels: data.map((m) => m.month),
    datasets: allCrews.map((crew, crewIndex) => ({
      label: crew,
      data: data.map((monthData) => {
        const crewData = monthData.crews.find(c => c.crew === crew);
        return crewData ? crewData.ratio : 0;
      }),
      backgroundColor: getCrewColor(crew, crewIndex),
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
        formatter: (value) =>
          value !== undefined && value !== null ? value.toFixed(0) : "0",
        anchor: "start",
        align: "end",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StackedBarCharts;
