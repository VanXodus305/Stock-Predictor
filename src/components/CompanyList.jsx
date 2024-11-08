import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Paper, Typography, Box } from "@mui/material";
import companyData from "../constants/companyData.json";

const CompanyList = ({ company }) => {
  const update = (
    ((company.stock[0].close - company.stock[0].open) / company.stock[0].open) *
    100
  ).toFixed(2);

  return (
    <Paper
      elevation={10}
      className="flex flex-row items-center justify-between py-1 md:py-1.5 pl-4 pr-1 md:pr-1.5 rounded-2xl cursor-pointer transition-all ease-in-out duration-300 hover:shadow-lg hover:bg-background_2 w-full md:h-16 h-[56px] group"
    >
      {/* Company Info Section */}
      <Box className="flex flex-row gap-5 items-center justify-start w-[80%] pl-2 md:pl-4">
        <img
          src={companyData.find((item) => item.symbol === company.symbol).logo}
          alt={company.symbol}
          className="object-contain md:h-10 h-8 aspect-square"
        />
        <Box className="flex flex-col items-start justify-start">
          <Typography variant="h6" className="font-semibold w-full">
            {companyData
              .find((item) => item.symbol === company.symbol)
              .name.toUpperCase()}
          </Typography>
          <Typography variant="body2" className="w-full">
            {company.symbol}
          </Typography>
        </Box>
      </Box>

      {/* Update Percentage Section */}
      <Box className="flex w-[20%] justify-end items-center h-full">
        <Box
          className={`flex flex-row items-center justify-center bg-background_1 md:px-3 px-1.5 rounded-xl h-full ${
            update < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {update < 0 ? (
            <GoTriangleDown className="text-2xl md:text-3xl" />
          ) : (
            <GoTriangleUp className="text-2xl md:text-3xl" />
          )}
          <Typography variant="body2" className="font-bold">
            {update}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CompanyList;
