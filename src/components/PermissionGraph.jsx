import React, { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const PermissionGraph = ({ data }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].data = data;
      chartInstanceRef.current.update();
    } else {
      chartInstanceRef.current = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: ["Read", "Write", "Delete"],
          datasets: [
            {
              label: "Permissions",
              data: data,
              backgroundColor: [
                "rgba(54, 162, 235, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(255, 99, 132, 0.5)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PermissionGraph;
