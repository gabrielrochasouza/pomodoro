import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/header";
import { PaletteMode } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import Provider from "./provider";

function App() {
  const currentTheme =
    localStorage.getItem("currentTheme") === "light" ? "light" : "dark";

  const [theme, setTheme] = useState<PaletteMode>(currentTheme);

  const changeTheme = () => {
    localStorage.setItem("currentTheme", theme === "dark" ? "light" : "dark");
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode: theme,
      ...(theme === "light"
        ? {
            // palette values for light mode
            primary: deepOrange,
            divider: deepOrange[100],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: grey[800],
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });
  const darkTheme = React.useMemo(
    () => createTheme(getDesignTokens(theme)),
    [theme]
  );

  return (
    <Provider>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <Header changeTheme={changeTheme} theme={theme} />
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
