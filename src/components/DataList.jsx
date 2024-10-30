import React from "react";
import "../styles/DataList.css";
// import "../index.css";

const DataList = ({ stock }) => {
  return (
    <div className="dashboard">
      <div className="stock-details">
        <div className="class-style">
          <p>
            <b>OPEN: 234.432</b>
          </p>
          <p>
            <b>HIGH:232.42</b>
          </p>
        </div>
        <div className="class-style">
          <p>
            <b>LOW: 22.232</b>
          </p>
          <p>
            <b>CLOSE: 32.22 </b>
          </p>
          <p>
            <b>VOLUME: 89.657</b>
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>OPEN</th>
              <th>LOW</th>
              <th>HIGH</th>
              <th>CLOSE</th>
              <th>VOLUME</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((stockItem, idx) => (
              <tr key={idx}>
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
