import { useState } from "react";
import "../styles/DataList.css";
import { Select, SelectItem } from "@nextui-org/react";
import Chart from "./Chart";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import { datalist } from "framer-motion/client";
// import "../index.css";

const DataList = ({ stock }) => {
  const stockDataTemp = [
    { date: "2024-10-01", open: 120, high: 125, low: 115, close: 122 },
    { date: "2024-10-02", open: 123, high: 128, low: 118, close: 125 },
    { date: "2024-10-03", open: 126, high: 130, low: 120, close: 128 },
    { date: "2024-10-04", open: 128, high: 135, low: 125, close: 130 },
    { date: "2024-10-05", open: 130, high: 137, low: 126, close: 134 },
    { date: "2024-10-06", open: 134, high: 139, low: 131, close: 136 },
    { date: "2024-10-07", open: 135, high: 140, low: 132, close: 138 },
    { date: "2024-10-08", open: 138, high: 143, low: 134, close: 139 },
    { date: "2024-10-09", open: 139, high: 144, low: 136, close: 142 },
    { date: "2024-10-10", open: 142, high: 148, low: 138, close: 145 },
    { date: "2024-10-11", open: 145, high: 150, low: 141, close: 147 },
    { date: "2024-10-12", open: 147, high: 153, low: 144, close: 150 },
    { date: "2024-10-13", open: 150, high: 155, low: 147, close: 153 },
    { date: "2024-10-14", open: 153, high: 158, low: 149, close: 155 },
    { date: "2024-10-15", open: 155, high: 160, low: 151, close: 157 },
    { date: "2024-10-16", open: 157, high: 162, low: 153, close: 159 },
    { date: "2024-10-17", open: 159, high: 165, low: 156, close: 163 },
    { date: "2024-10-18", open: 163, high: 168, low: 159, close: 166 },
    { date: "2024-10-19", open: 166, high: 172, low: 162, close: 170 },
    { date: "2024-10-20", open: 170, high: 175, low: 165, close: 172 },
    { date: "2024-10-21", open: 172, high: 178, low: 168, close: 174 },
    { date: "2024-10-22", open: 174, high: 180, low: 170, close: 176 },
    { date: "2024-10-23", open: 176, high: 183, low: 172, close: 179 },
    { date: "2024-10-24", open: 179, high: 185, low: 175, close: 181 },
    { date: "2024-10-25", open: 181, high: 188, low: 178, close: 184 },
    { date: "2024-10-26", open: 184, high: 190, low: 180, close: 186 },
    { date: "2024-10-27", open: 186, high: 193, low: 183, close: 189 },
    { date: "2024-10-28", open: 189, high: 195, low: 185, close: 191 },
    { date: "2024-10-29", open: 191, high: 197, low: 188, close: 194 },
    { date: "2024-10-30", open: 194, high: 200, low: 190, close: 197 },
    { date: "2024-10-31", open: 197, high: 203, low: 193, close: 201 },
    { date: "2024-11-01", open: 201, high: 207, low: 197, close: 204 },
    { date: "2024-11-02", open: 204, high: 210, low: 200, close: 207 },
    { date: "2024-11-03", open: 207, high: 213, low: 203, close: 210 },
    { date: "2024-11-04", open: 210, high: 215, low: 206, close: 213 },
  ];
  const dateRanges = [
    { label: "Last 5 days", key: 5, start: 0, end: 5 },
    { label: "Last 10 days", key: 10, start: 0, end: 10 },
    { label: "Last 15 days", key: 15, start: 0, end: 15 },
    { label: "Last 20 days", key: 20, start: 0, end: 20 },
    { label: "Last 30 days", key: 30, start: 0, end: 30 },
    { label: "Last 40 days", key: 40, start: 0, end: 40 },
  ];
  const [dateRange, setDateRange] = useState(dateRanges[0]);

  const sortOptions = ["unsorted", "ascending", "descending"];
  const [sort, setSort] = useState(sortOptions[0]);

  const [stockData, setStockData] = useState(stock.slice(0, 5));

  const [page, setPage] = useState(1);

  return (
    <div className="dashboard w-full bg-foreground_1">
      <div className="stock-details">
        <div className="class-style">
          <p>
            <b>Open: {stock[0].open}</b>
          </p>
          <p>
            <b>High: {stock[0].high}</b>
          </p>
        </div>
        <div className="class-style">
          <p>
            <b>Low: {stock[0].low}</b>
          </p>
          <p>
            <b>Close: {stock[0].close}</b>
          </p>
          <p>
            <b>Volume: {stock[0].volume}</b>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center pb-8 w-full mx-auto">
        <div className="table-container w-full text-neutral-200">
          <table className="stock-table">
            <thead>
              <tr>
                <th>
                  <Select
                    label="DATE"
                    variant="underlined"
                    radius="none"
                    defaultSelectedKeys={["5"]}
                    onSelectionChange={(value) => {
                      const range = dateRanges.find(
                        (d) => d.key == Array.from(value)[0]
                      );
                      setDateRange(range ? range : dateRange);
                      setStockData(stock.slice(range.start, range.end));
                      setPage(1);
                    }}
                    classNames={{
                      popoverContent: "dark bg-[#124690]",
                      value: "text-md",
                      trigger: "py-0",
                      label: "text-md text-neutral-200",
                      base: "dark",
                    }}
                  >
                    {dateRanges.map((dateRange) => (
                      <SelectItem key={dateRange.key}>
                        {dateRange.label}
                      </SelectItem>
                    ))}
                  </Select>
                </th>
                <th>OPEN</th>
                <th>LOW</th>
                <th>HIGH</th>
                <th>CLOSE</th>
                <th
                  className="cursor-pointer"
                  onClick={() => (
                    setPage(1),
                    sort === "unsorted"
                      ? (setSort("ascending"),
                        setStockData(
                          stockData.sort((a, b) => a.volume - b.volume)
                        ))
                      : sort === "ascending"
                      ? (setSort("descending"),
                        setStockData(
                          stockData.sort((a, b) => b.volume - a.volume)
                        ))
                      : (setSort("unsorted"),
                        setStockData(
                          stock.slice(dateRange.start, dateRange.end)
                        ))
                  )}
                >
                  <div className="flex flex-row w-full justify-center gap-2 items-center select-none">
                    <h1>VOLUME</h1>
                    {sort === "unsorted" ? (
                      <TiArrowUnsorted className="flex text-lg" />
                    ) : sort === "ascending" ? (
                      <TiArrowSortedUp className="flex text-lg" />
                    ) : (
                      <TiArrowSortedDown className="flex text-lg" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {stockData
                .slice((page - 1) * 5, (page - 1) * 5 + 5)
                .map((stockItem, idx) => (
                  <tr key={idx} className="bg-foreground_1">
                    <td>{stockItem.date}</td>
                    <td>{stockItem.open}</td>
                    <td>{stockItem.low}</td>
                    <td>{stockItem.high}</td>
                    <td>{stockItem.close}</td>
                    <td>{stockItem.volume}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div
          className={`flex flex-row gap-2 items-center justify-center w-full ${
            dateRange.key === 5 ? "hidden" : ""
          }`}
        >
          <h1 className="text-xl font-bold">PAGE:</h1>
          <div className="flex flex-row gap-1.5 items-center justify-evenly"></div>
          {Array(stockData.length / 5)
            .fill(undefined)
            .map((_, index) => (
              <div
                className={`flex items-center justify-center rounded-full border-background_2 size-8 cursor-pointer p-2 border-2 hover:scale-110 hover:bg-background_2 group transition-all ease-in-out duration-100 ${
                  index + 1 === page ? "bg-background_2" : "bg-transparent"
                }`}
                key={index + 1}
                onClick={() => setPage(index + 1)}
              >
                <h1
                  className={`text-md font-bold group-hover:text-neutral-200 ${
                    index + 1 === page
                      ? "text-neutral-200"
                      : "text-background_2"
                  }`}
                >
                  {index + 1}
                </h1>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6 w-full">
        <Chart data={stockDataTemp}></Chart>
      </div>
    </div>
  );
};

export default DataList;
