import { useState } from "react";
import { stockData } from "./constants/data";
import CompanyList from "./components/CompanyList";
import DataList from "./components/DataList";
import NavBar from "./components/NavBar";
import { IoArrowBack } from "react-icons/io5";
import { Button, Input } from "@nextui-org/react";
import { FaArrowRight, FaKey, FaUser } from "react-icons/fa6";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { MdOutlineHorizontalRule } from "react-icons/md";

const App = () => {
  const [company, setCompany] = useState(undefined);
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
