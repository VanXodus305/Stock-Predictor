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
import "../styles/Chart.css";

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`Date: ${label}`}</p>
        <p>{`Open: ${data.open}`}</p>
        <p>{`Close: ${data.close}`}</p>
        <p>{`High: ${data.high}`}</p>
        <p>{`Low: ${data.low}`}</p>
      </div>
    );
  }
  return null;
};

const CandlestickShape = ({ x, y, width, height, payload, min, max }) => {
  const isBullish = payload.close > payload.open;
  const color = isBullish ? "#4CAF50" : "#F44336"; // Green for bullish, red for bearish

  const yScale = (value) => y + (height * (max - value)) / (max - min);

  const highY = yScale(payload.high);
  const lowY = yScale(payload.low);
  const openY = yScale(payload.open);
  const closeY = yScale(payload.close);

  const candleBodyY = Math.min(openY, closeY);
  const candleBodyHeight = Math.abs(openY - closeY);

  return (
    <>
      <line
        x1={x + width / 2}
        y1={highY}
        x2={x + width / 2}
        y2={lowY}
        stroke={color}
        strokeWidth={1}
      />
      <rect
        x={x + width * 0.25}
        y={candleBodyY}
        width={width * 0.5}
        height={candleBodyHeight}
        fill={color}
      />
    </>
  );
};

const CandlestickChart = ({ data }) => {
  const min = Math.min(...data.map((item) => item.low));
  const max = Math.max(...data.map((item) => item.high));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis domain={[min, max]} stroke="#ccc" />
        <Tooltip content={<CustomTooltip />} />
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
