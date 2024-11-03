import { useState } from "react";
import { stockData } from "./constants/data";
import CompanyList from "./components/CompanyList";
import DataList from "./components/DataList";
import NavBar from "./components/NavBar";
import { IoArrowBack } from "react-icons/io5";

const App = () => {
  const [company, setCompany] = useState(undefined);

  return (
    <>
      <NavBar />
      <div className="overflow-x-hidden antialiased text-neutral-200 selection:bg-neutral-200 selection:text-neutral-800">
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-background_1"></div>
        </div>
        <div className="container mx-auto px-5 py-20">
          {company ? (
            <div className="flex flex-row gap-3 md:gap-5 items-center justify-start mb-10">
              <IoArrowBack
                className="md:text-5xl text-3xl cursor-pointer mr-2"
                onClick={() => setCompany(undefined)}
              />
              <img
                src={company.logo}
                alt={company.name}
                className="object-contain md:h-16 h-12 aspect-square"
              ></img>
              <h1 className="md:text-5xl text-3xl font-bold">{company.name}</h1>
            </div>
          ) : (
            <h1 className="md:text-5xl text-3xl mb-7 font-bold">Stocks</h1>
          )}
          {company ? (
            <div className="w-full flex flex-col gap-10 items-start justify-center">
              <DataList stock={company.stock}></DataList>
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-center justify-center">
              {stockData.map((company, index) => (
                <div
                  onClick={() => setCompany(company)}
                  className="w-full"
                  key={index}
                >
                  <CompanyList company={company} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
