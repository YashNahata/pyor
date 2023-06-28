"use client";
import { createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

export default function Chart() {
  const [firstBlockNumber, setFirstBlockNumber] = useState(0);
  const [lastBlockNumber, setLastBlockNumber] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
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
  }, []);

  const getBlockNumber = (e) => {
    e.preventDefault();
    let obj = {
      date: document.getElementById("day").value,
    };
    fetch("http://127.0.0.1:5328/api/block-numbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        setFirstBlockNumber(data.first);
        setLastBlockNumber(data.last);
      });
  };

  return (
    <>
      <legend className="p-2">Ethereum Daily Gas Used Chart</legend>
      <div className="p-2" ref={chartRef} />
      <br />
      <form id="form" className="p-2" method="post" onSubmit={getBlockNumber}>
        <label htmlFor="day">Enter the day: </label>
        <input type="date" name="day" id="day" className="text-black" />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white ml-2 font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <br />
      <p className="p-2">
        The first block for the above date is : {firstBlockNumber}
      </p>
      <p className="p-2">
        The last block for the above date is : {lastBlockNumber}
      </p>
    </>
  );
}
