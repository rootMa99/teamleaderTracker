import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

const StackedBarCharts = ({ data }) => {
  // Function to extract data and assign colors based on month
  const extractData = (d) => {
    const colors = {}; // Object to store colors for each month
    const rd = [];
    d.forEach((e) => {
      e.families.forEach((m) => {
        const label = `${e.month}-${m.family}`;
        rd.push({
          label: label,
          ratio: m.ratio,
          target: m.target,
        });
        const month = e.month;
        // Generate color for the month if not already generated
        if (!colors[month]) {
          colors[month] = getRandomColor(); // Function to get a random color
        }
      });
    });
    return { data: rd, colors: colors };
  };

  // Function to generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const { data: db, colors } = extractData(data);
  console.log(db);
  console.log(colors);

  // Constructing data for chart
  const datac = {
    labels: db.map((m) => m.label),
    datasets: [
      {
        type: "line",
        label: "Target",
        data: db.map((m) => m.target.toFixed(0)),
        backgroundColor: "#F84018",
        pointHoverBorderColor: "#FAF0E6",
        borderColor: "#3BC6EB",
        fill: false,
        tension: 0.3,
        borderWidth: 3,
        borderCapStyle: "round",
        pointHoverBackgroundColor: "rgb(88, 3, 3)",
        pointHoverRadius: 8,
        pointBorderColor: "#3BC6EB",
        pointBorderWidth: 8,
        pointRadius: 1,
      },
      {
        type: "bar",
        label: "Ratio",
        data: db.map((m) => m.ratio.toFixed(0)),
        backgroundColor: db.map((m) => {
          const month = m.label.split('-')[0]; // Extract month from label
          return colors[month];
        }),
        hoverBackgroundColor: "#929D96",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
      },
      y: {
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          display: false,
          color: "white",
          fontWeight: "bold",
        },
        stacked: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FAF0E6",
        },
        display: true,
        position: 'bottom', // Position of the legend
        onClick: null, // Disable legend click event
        onHover: null, // Disable legend hover effect
        onLeave: null, // Disable legend leave effect
        onResize: null, // Disable legend resize event
      },
      datalabels: {
        display: true,
      },
      hover: {
        mode: "nearest",
        intersect: false,
        animationDuration: 400,
      },
    },
    animation: {
      onComplete: (animation) => {
        const { chart } = animation;
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, index) => {
          const meta = chart.getDatasetMeta(index);
          meta.data.forEach((element, index) => {
            const data = `${dataset.data[index]}`;
            let xPos, yPos;
            if (dataset.type === "bar") {
              xPos = element.x;
              yPos = element.y + element.height / 2;
            } else if (dataset.type === "line") {
              xPos = element.x;
              yPos = element.y - 20;
            }
            ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = dataset.type === "bar" ? "#006B63" : "#EEEEEE";
            ctx.font = "bold 10px Arial";
            ctx.fillText(data, xPos, yPos);
            ctx.restore();
          });
        });
      },
    },
  };

  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarElement
  );

  return <Line data={datac} options={options} />;
};

export default StackedBarCharts;
