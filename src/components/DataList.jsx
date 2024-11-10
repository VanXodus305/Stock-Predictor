import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Pagination,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import Chart from "./Chart";
import "../styles/DataList.css";

const DataList = ({ stock }) => {
  const dateRanges = [
    { label: "Last 5 days", key: 5, start: 0, end: 5 },
    { label: "Last 10 days", key: 10, start: 0, end: 10 },
    { label: "Last 15 days", key: 15, start: 0, end: 15 },
    { label: "Last 20 days", key: 20, start: 0, end: 20 },
    { label: "Last 30 days", key: 30, start: 0, end: 30 },
    { label: "Last 40 days", key: 40, start: 0, end: 40 },
    { label: "Last 50 days", key: 50, start: 0, end: 50 },
    { label: "Last 60 days", key: 60, start: 0, end: 60 },
  ];

  const [dateRange, setDateRange] = useState(dateRanges[0]);
  const [sort, setSort] = useState("unsorted");
  const [stockData, setStockData] = useState(stock.slice(0, 5));
  const [page, setPage] = useState(1);

  return (
    <div className="dashboard w-full bg-foreground_1">
      {/* Stock Details Section */}
      <div className="stock-details">
        <div className="class-style">
          <Typography variant="h6">
            <b>Open: {stock[0].open}</b>
          </Typography>
          <Typography variant="h6">
            <b>High: {stock[0].high}</b>
          </Typography>
        </div>
        <div className="class-style">
          <Typography variant="h6">
            <b>Low: {stock[0].low}</b>
          </Typography>
          <Typography variant="h6">
            <b>Close: {stock[0].close}</b>
          </Typography>
          <Typography variant="h6">
            <b>Volume: {stock[0].volume}</b>
          </Typography>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col gap-4 justify-center items-center pb-8 w-full mx-auto">
        <TableContainer
          component={Paper}
          className="table-container w-full text-neutral-200"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Date</InputLabel>
                    <Select
                      value={dateRange.key}
                      onChange={(e) => {
                        const range = dateRanges.find(
                          (d) => d.key === e.target.value
                        );
                        setDateRange(range ? range : dateRange);
                        setStockData(stock.slice(range.start, range.end));
                        setPage(1);
                      }}
                      label="Date"
                    >
                      {dateRanges
                        .filter(
                          (dateRange) =>
                            (dateRange.key === 5 && stock.length < 5) ||
                            stock.length >= dateRange.key ||
                            (stock.length < dateRange.key &&
                              dateRanges[dateRanges.indexOf(dateRange) - 1]
                                .key < stock.length)
                        )
                        .map((dateRange) => (
                          <MenuItem key={dateRange.key} value={dateRange.key}>
                            {dateRange.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>Open</TableCell>
                <TableCell>Low</TableCell>
                <TableCell>High</TableCell>
                <TableCell>Close</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setPage(1);
                      if (sort === "unsorted") {
                        setSort("ascending");
                        setStockData(
                          stockData.sort((a, b) => a.volume - b.volume)
                        );
                      } else if (sort === "ascending") {
                        setSort("descending");
                        setStockData(
                          stockData.sort((a, b) => b.volume - a.volume)
                        );
                      } else {
                        setSort("unsorted");
                        setStockData(
                          stock.slice(dateRange.start, dateRange.end)
                        );
                      }
                    }}
                  >
                    <div className="flex flex-row w-full justify-center gap-2 items-center select-none">
                      <Typography variant="h6">Volume</Typography>
                      {sort === "unsorted" ? (
                        <TiArrowUnsorted className="flex text-lg" />
                      ) : sort === "ascending" ? (
                        <TiArrowSortedUp className="flex text-lg" />
                      ) : (
                        <TiArrowSortedDown className="flex text-lg" />
                      )}
                    </div>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData
                .slice((page - 1) * 5, (page - 1) * 5 + 5)
                .map((stockItem, idx) => (
                  <TableRow key={idx} className="bg-foreground_1">
                    <TableCell>{stockItem.date}</TableCell>
                    <TableCell>{stockItem.open}</TableCell>
                    <TableCell>{stockItem.low}</TableCell>
                    <TableCell>{stockItem.high}</TableCell>
                    <TableCell>{stockItem.close}</TableCell>
                    <TableCell>{stockItem.volume}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div
          className={`flex flex-row gap-2 items-center justify-center w-full ${
            dateRange.key === 5 ? "hidden" : ""
          }`}
        >
          <Typography variant="h6" className="text-xl font-bold">
            Page:
          </Typography>
          <Pagination
            count={Math.ceil(stockData.length / 5)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 w-full bg-background_2 mb-8 p-5 rounded-2xl">
        <Chart data={stockData}></Chart>
      </div>
    </div>
  );
};

export default DataList;
