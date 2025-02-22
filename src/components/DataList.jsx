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
  // Adjusted date ranges to reflect up to 60 days
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

  const sortOptions = ["unsorted", "ascending", "descending"];
  const [sort, setSort] = useState(sortOptions[0]);

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
              <TableRow className="table-head">
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>
                      <Typography
                        variant="subtitle1"
                        color="common.white"
                        align="center"
                      >
                        DATE
                      </Typography>
                    </InputLabel>
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
                      color="primary"
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
                            <Typography variant="subtitle1">
                              {dateRange.label}
                            </Typography>
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    color="common.white"
                    align="center"
                  >
                    OPEN
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    color="common.white"
                    align="center"
                  >
                    LOW
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    color="common.white"
                    align="center"
                  >
                    HIGH
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    color="common.white"
                    align="center"
                  >
                    CLOSE
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    color="common.white"
                    align="center"
                  >
                    STATUS
                  </Typography>
                </TableCell>
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
                      <Typography variant="subtitle1" color="common.white">
                        VOLUME
                      </Typography>
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
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        color="common.white"
                        align="center"
                      >
                        {stockItem.date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        color="common.white"
                        align="center"
                      >
                        {stockItem.open}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        color="common.white"
                        align="center"
                      >
                        {stockItem.low}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        color="common.white"
                        align="center"
                      >
                        {stockItem.high}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        color="common.white"
                        align="center"
                      >
                        {stockItem.close}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        color={
                          (
                            ((stockItem.close - stockItem.open) /
                              stockItem.open) *
                            100
                          ).toFixed(2) < 0
                            ? "#ff474c"
                            : "#80ef80"
                        }
                        align="center"
                        fontWeight={600}
                      >
                        {(
                          ((stockItem.close - stockItem.open) /
                            stockItem.open) *
                          100
                        ).toFixed(2)}
                        %
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" color="common.white">
                        {stockItem.volume}
                      </Typography>
                    </TableCell>
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
            PAGE:
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
