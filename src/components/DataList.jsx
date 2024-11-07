import { useState } from "react";
import "../styles/DataList.css";
import { Select, SelectItem } from "@nextui-org/react";
import Chart from "./Chart";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

const DataList = ({ stock }) => {
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
          <table className="stock-table rounded-lg">
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

      <div className="mt-6 w-full bg-background_2 mb-8 p-5 rounded-2xl">
        <Chart data={stockData}></Chart>
      </div>
    </div>
  );
};

export default DataList;
