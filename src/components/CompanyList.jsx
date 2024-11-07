import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const CompanyList = ({ company }) => {
  const update = (
    ((company.stock[0].close - company.stock[1].open) / company.stock[0].open) *
    100
  ).toFixed(2);

  return (
    <div className="flex bg-foreground_1 flex-row items-center justify-between py-1 md:py-1.5 pl-4 pr-1 md:pr-1.5 rounded-2xl shadow-md cursor-pointer transition-all ease-in-out duration-300 hover:shadow-lg hover:shadow-foreground_1 hover:bg-background_2 w-full md:h-16 h-[56px] group">
      <div className="flex flex-row gap-5 items-center justify-start w-[80%] pl-2 md:pl-4">
        <img
          src={company.logo}
          alt={company.name}
          className="object-contain md:h-10 h-8 aspect-square"
        ></img>
        <div className="flex flex-col items-center justify-start">
          <h1 className="text-lg md:text-xl font-semibold w-full">
            {company.name.toUpperCase()}
          </h1>
          <p className="text-sm md:text-md w-full">{company.symbol}</p>
        </div>
      </div>
      <div className="flex w-[20%] justify-end items-center h-full">
        <div
          className={`flex flex-row items-center justify-center bg-background_1 md:px-3 px-1.5 rounded-xl h-full ${
            update < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {update < 0 ? (
            <GoTriangleDown className="text-2xl md:text-3xl" />
          ) : (
            <GoTriangleUp className="text-2xl md:text-3xl" />
          )}
          <p className="text-sm md:text-md font-bold">{update}%</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
