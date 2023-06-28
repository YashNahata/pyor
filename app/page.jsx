"use client";
import { createChart } from "lightweight-charts";
import React, { useRef } from "react";

export default function Chart() {
  const chartRef = useRef(null);
  fetch("http://127.0.0.1:5328/api/gas-used")
    .then((res) => res.json())
    .then((data) => {
      if (chartRef.current && data) {
        data = data.reverse();
        const chart = createChart(chartRef.current, {
          width: 600,
          height: 300,
        });
        const lineSeries = chart.addLineSeries();

        chart.add;

        lineSeries.setData(data);
        chart.applyOptions({
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
          },
          priceScale: {
            position: "right",
          },
        });
      }
    });

  return (
    <>
      <legend>Ethereum Daily Gas Used Chart</legend>
      <div ref={chartRef} />
    </>
  );
}
