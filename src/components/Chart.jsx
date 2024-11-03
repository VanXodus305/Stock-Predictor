import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CandlestickChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        
        {/* Add Line component for high and low points */}
        <Line
          type="monotone"
          dataKey="high"
          stroke="#4CAF50"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="low"
          stroke="#F44336"
          strokeWidth={2}
          dot={false}
        />

        {/* Use Bar component to create the "body" of each candlestick */}
        <Bar
          dataKey="close"
          fill="#8884d8"
          label={{ position: "top" }}
          shape={({ x, y, width, height, payload }) => {
            const color = payload.open > payload.close ? "#F44336" : "#4CAF50";
            return (
              <rect
                x={x}
                y={payload.open > payload.close ? y : y + height}
                width={width}
                height={Math.abs(height - y)}
                fill={color}
              />
            );
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;
