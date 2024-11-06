import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
} from "recharts";

const CandlestickShape = ({ x, y, width, height, payload, min, max }) => {
  // Define colors
  const isBullish = payload.close > payload.open;
  const color = isBullish ? "#4CAF50" : "#F44336"; // Green for bullish, red for bearish

  // Calculate Y scale
  const yScale = (value) => y + (height * (max - value)) / (max - min);

  // Position calculations for wicks and body
  const highY = yScale(payload.high);
  const lowY = yScale(payload.low);
  const openY = yScale(payload.open);
  const closeY = yScale(payload.close);

  // Body position and height
  const candleBodyY = Math.min(openY, closeY);
  const candleBodyHeight = Math.abs(openY - closeY);

  return (
    <>
      {/* Wick */}
      <line
        x1={x + width / 2}
        y1={highY}
        x2={x + width / 2}
        y2={lowY}
        stroke={color}
        strokeWidth={1} // Thinner wick for better aesthetics
      />
      {/* Body */}
      <rect
        x={x + width * 0.25} // Position it within the middle of the column
        y={candleBodyY}
        width={width * 0.5} // Make the body narrower
        height={candleBodyHeight}
        fill={color}
      />
    </>
  );
};

const CandlestickChart = ({ data }) => {
  // Find min and max values for scaling
  const min = Math.min(...data.map((item) => item.low));
  const max = Math.max(...data.map((item) => item.high));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[min, max]} />
        <Tooltip />
        {/* Custom Bar with CandlestickShape */}
        <Bar
          dataKey="close"
          fill="#8884d8"
          shape={<CandlestickShape min={min} max={max} />}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;
