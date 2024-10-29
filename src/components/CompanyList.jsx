import React from "react";

const CompanyList = ({ company }) => {
  return (
    <div
      className="flex bg-foreground flex-row items-center justify-between py-1 md:py-2 px-4 rounded-2xl shadow-md cursor-pointer transition-all ease-in-out duration-300 hover:shadow-lg hover:shadow-foreground hover:bg-background_2 w-full"
    >
      <div className="flex flex-row gap-5 items-center justify-start w-[50%] pl-2 md:pl-4">
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
      <div className="flex w-[50%] justify-end items-center"></div>
    </div>
  );
};

export default CompanyList;
