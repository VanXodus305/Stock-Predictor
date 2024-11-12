import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Paper, Typography, Box } from "@mui/material";
import companyData from "../constants/companyData.json";
import "../styles/CompanyList.css";

const CompanyList = ({ company }) => {
  const update = (
    ((company.stock[0].close - company.stock[0].open) / company.stock[0].open) *
    100
  ).toFixed(2);

  return (
    <Paper className="company-list-container">
      {/* Company Info Section */}
      <Box className="company-info">
        <img
          src={companyData.find((item) => item.symbol === company.symbol).logo}
          alt={company.symbol}
          className="company-logo"
        />
        <Box className="company-details">
          <Typography variant="h6" className="company-name">
            {companyData
              .find((item) => item.symbol === company.symbol)
              .name.toUpperCase()}
          </Typography>
          <Typography variant="body2" className="company-symbol">
            {company.symbol}
          </Typography>
        </Box>
      </Box>

      {/* Update Percentage Section */}
      <Box className="update-percentage">
        <Box className={`update-box ${update < 0 ? "text-red" : "text-green"}`}>
          {update < 0 ? (
            <GoTriangleDown className="update-icon" />
          ) : (
            <GoTriangleUp className="update-icon" />
          )}
          <Typography variant="body2" className="update-percentage-text">
            {update}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CompanyList;
