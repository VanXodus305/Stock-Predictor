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
    <Paper
      className="company-list-container"
      sx={{ borderRadius: "10px", backgroundColor: "#2463A2" }}
    >
      {/* Company Info Section */}
      <Box className="company-info">
        <img
          src={companyData.find((item) => item.symbol === company.symbol).logo}
          alt={company.symbol}
          className="company-logo"
        />
        <Box className="company-details">
          <Typography
            variant="h6"
            color="common.white"
            sx={{
              fontWeight: "600",
            }}
            className="company-name"
          >
            {companyData
              .find((item) => item.symbol == company.symbol)
              .name.toUpperCase()}
          </Typography>
          <Typography
            variant="body2"
            color="common.white"
            className="company-symbol"
          >
            {company.symbol}
          </Typography>
        </Box>
      </Box>

      {/* Update Percentage Section */}
      <Box className="update-percentage" height="100%">
        <Box
          className={`update-box ${update < 0 ? "text-red" : "text-green"}`}
          sx={{ borderRadius: "10px", backgroundColor: "#041D37" }}
          height="100%"
        >
          {update < 0 ? (
            <GoTriangleDown className="update-icon" />
          ) : (
            <GoTriangleUp className="update-icon" />
          )}
          <Typography
            variant="body2"
            className="update-percentage-text"
            sx={{ fontWeight: "bold" }}
          >
            {update}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CompanyList;
