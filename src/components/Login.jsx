import React, { useState } from "react";
import { Button, TextField, Alert, Typography } from "@mui/material";
import { FaArrowRight, FaKey, FaUser } from "react-icons/fa";

const Login = ({ click }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const credentials = {
    username: "admin",
    password: "admin",
  };

  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-7 md:gap-10">
      <h1 className="md:text-5xl text-4xl text-center w-full font-bold">
        Stock Predictor
      </h1>
      <div className="flex flex-col gap-6 w-full max-w-[800px] bg-foreground_1 py-10 px-6 rounded-3xl dark">
        <TextField
          label={
            <Typography variant="subtitle1" color="common.white" align="center">
              Username
            </Typography>
          }
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: <FaUser className="text-lg text-neutral-200" />,
            style: { backgroundColor: "#414141" },
          }}
        />
        <TextField
          label={
            <Typography variant="subtitle1" color="common.white" align="center">
              Password
            </Typography>
          }
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <FaKey className="text-lg text-neutral-200" />,
            style: { backgroundColor: "#414141" },
          }}
        />
        <div className="flex items-center justify-center mt-2 flex-col gap-1">
          <Button
            variant="contained"
            fullWidth
            endIcon={<FaArrowRight style={{ color: "white" }} />}
            onClick={() =>
              username === credentials.username &&
              password === credentials.password
                ? (click(), setError(false))
                : (setError(true), setTimeout(() => setError(false), 3000))
            }
            sx={{ backgroundColor: "#041D37", borderRadius: "10px" }}
          >
            <Typography
              variant="h6"
              color="common.white"
              align="center"
              sx={{
                fontWeight: "600",
              }}
            >
              LOGIN
            </Typography>
          </Button>
          {error && (
            <Alert severity="error">Invalid Username or Password</Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
