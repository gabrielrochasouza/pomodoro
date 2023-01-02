import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Container, PaletteMode } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import UpdateIcon from "@mui/icons-material/Update";
interface HeaderProps {
  changeTheme?: () => void;
  theme: PaletteMode | undefined;
}

const Header = ({ changeTheme, theme }: HeaderProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar enableColorOnDark color="primary" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: "flex" }}>
            <UpdateIcon sx={{ display: { md: "flex" }, mr: 1 }} />
            <Typography
              noWrap
              component="a"
              href="/"
              variant="h6"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                bgcolor: "primary",
              }}
            >
              Pomodoro
            </Typography>
            <Box sx={{ flexGrow: 1, textAlign: "end" }}>
              <IconButton size="small" color="inherit" onClick={changeTheme}>
                {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
