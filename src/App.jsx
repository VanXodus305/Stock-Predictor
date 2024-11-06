import { useState } from "react";
import { stockData } from "./constants/data";
import CompanyList from "./components/CompanyList";
import DataList from "./components/DataList";
import Chart from "./components/Chart";
import NavBar from "./components/NavBar";
import { IoArrowBack } from "react-icons/io5";
import { Button, Input } from "@nextui-org/react";
import { FaArrowRight, FaKey, FaUser } from "react-icons/fa6";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { MdOutlineHorizontalRule } from "react-icons/md";

const App = () => {
  const [company, setCompany] = useState(undefined);
  const data = [
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

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const credentials = {
    username: "admin",
    password: "admin",
  };

  const prediction = "high";

  return (
    <>
      <NavBar />
      <div className="overflow-x-hidden antialiased text-neutral-200 selection:bg-neutral-200 selection:text-neutral-800">
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-background_1"></div>
        </div>
        <div className="container mx-auto px-5 py-20 h-screen">
          {loggedIn ? (
            <div className="pb-20">
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
                  <h1 className="md:text-5xl text-3xl font-bold">
                    {company.name}
                  </h1>
                  <Button
                    className={`bg-background_2 hover:scale-105 ml-3 border-3 ${
                      prediction == "low"
                        ? "border-red-500"
                        : prediction == "high"
                        ? "border-green-400"
                        : "border-yellow-500"
                    } hover:shadow-lg hover:shadow-foreground_1 cursor-default transition-all duration-200 ease-in-out`}
                    radius="lg"
                    size="lg"
                    startContent={
                      prediction == "low" ? (
                        <GoTriangleDown className="text-5xl text-red-500" />
                      ) : prediction == "high" ? (
                        <GoTriangleUp className="text-5xl text-green-500" />
                      ) : (
                        <MdOutlineHorizontalRule className="text-5xl text-yellow-500" />
                      )
                    }
                  >
                    <p
                      className={`text-lg md:text-xl font-bold ${
                        prediction == "low"
                          ? "text-red-500"
                          : prediction == "high"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {prediction.toUpperCase()}
                    </p>
                  </Button>
                </div>
              ) : (
                <h1 className="md:text-5xl text-3xl mb-7 font-bold">Stocks</h1>
              )}

              {company ? (
                <div className="w-full flex flex-col gap-10 items-start justify-center">
                  <DataList stock={company.stock}></DataList>
                  <Chart data={data}></Chart>
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
          ) : (
            <>
              <div className="flex w-full h-full items-center justify-center">
                <div className="flex flex-col gap-6 w-full max-w-[800px] bg-foreground_1 py-10 px-6 rounded-3xl dark">
                  <Input
                    label="Username"
                    isClearable
                    size="lg"
                    isRequired
                    radius="lg"
                    labelPlacement="outside"
                    startContent={
                      <FaUser className="text-lg text-neutral-400" />
                    }
                    classNames={{
                      label: "text-lg text-neutral-200 font-semibold",
                    }}
                    onValueChange={(value) => setUsername(value)}
                  ></Input>
                  <Input
                    label="Password"
                    isClearable
                    size="lg"
                    type="password"
                    isRequired
                    radius="lg"
                    labelPlacement="outside"
                    startContent={
                      <FaKey className="text-lg text-neutral-400" />
                    }
                    classNames={{
                      label: "text-lg text-neutral-200 font-semibold",
                    }}
                    onValueChange={(value) => setPassword(value)}
                  ></Input>
                  <div className="flex w-full items-center justify-center mt-2 flex-col gap-1">
                    <Button
                      radius="large"
                      size="lg"
                      fullWidth
                      endContent={
                        <FaArrowRight className="text-xl text-blue-400" />
                      }
                      className="max-w-[200px] bg-background_1 hover:scale-105 transition-all ease-in-out duration-200 hover:shadow-lg hover:shadow-blue-500"
                      onPress={() =>
                        username == credentials.username &&
                        password == credentials.password
                          ? (setLoggedIn(true), setError(false))
                          : (setError(true),
                            setTimeout(() => setError(false), 3000))
                      }
                    >
                      <h1 className="font-bold text-neutral-200 text-xl">
                        LOGIN
                      </h1>
                    </Button>
                    {error && (
                      <p className="text-red-500 text-md font-semibold">
                        Invalid Username or Password
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
