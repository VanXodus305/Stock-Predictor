import { useState } from "react";
import "../styles/DataList.css";
import { Select, SelectItem } from "@nextui-org/react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
// import "../index.css";

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
                onClick={() =>
                  sort === "unsorted"
                    ? setSort("ascending")
                    : sort === "ascending"
                    ? setSort("descending")
                    : setSort("unsorted")
                }
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
            {sort === "unsorted"
              ? stock
                  .slice(dateRange.start, dateRange.end)
                  .map((stockItem, idx) => (
                    <tr key={idx} className="bg-foreground_1">
                      <td>{stockItem.date}</td>
                      <td>{stockItem.open}</td>
                      <td>{stockItem.low}</td>
                      <td>{stockItem.high}</td>
                      <td>{stockItem.close}</td>
                      <td>{stockItem.volume}</td>
                    </tr>
                  ))
              : sort === "ascending"
              ? stock
                  .slice(dateRange.start, dateRange.end)
                  .sort((a, b) => a.volume - b.volume)
                  .map((stockItem, idx) => (
                    <tr key={idx} className="bg-foreground_1">
                      <td>{stockItem.date}</td>
                      <td>{stockItem.open}</td>
                      <td>{stockItem.low}</td>
                      <td>{stockItem.high}</td>
                      <td>{stockItem.close}</td>
                      <td>{stockItem.volume}</td>
                    </tr>
                  ))
              : stock
                  .slice(dateRange.start, dateRange.end)
                  .sort((a, b) => b.volume - a.volume)
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
    </div>
  );
};

export default DataList;
