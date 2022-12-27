import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { PaletteMode } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { deepOrange } from "@mui/material/colors";

interface HeaderProps {
  changeTheme?: () => void;
  theme: PaletteMode | undefined;
}

const Header = ({ changeTheme, theme }: HeaderProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pomodoro
          </Typography>
          <Button size="small" color="inherit">
            Histórico
          </Button>
          <IconButton size="small" color="inherit" onClick={changeTheme}>
            {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
