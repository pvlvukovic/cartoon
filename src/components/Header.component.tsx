import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, matchPath, Outlet, useLocation } from "react-router-dom";

const pages = [
  {
    name: "Characters",
    path: "/",
  },
];

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const routeMatch = useRouteMatch(pages.map((page) => page.path));
  const currentTab = routeMatch?.pattern?.path;

  return (
    <div>
      <AppBar position="sticky" color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, mr: 2, display: { xs: "none", sm: "flex" } }}
            >
              Rick and Morty
            </Typography>

            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    selected={currentTab === page.path}
                  >
                    {page.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}
            >
              Rick and Morty
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Tabs
                value={currentTab}
                onChange={handleCloseNavMenu}
                aria-label="navigation tabs"
                sx={{
                  display: { xs: "none", sm: "flex" },
                }}
                TabIndicatorProps={{
                  style: {
                    display: "none",
                  },
                }}
              >
                {pages.map((page) => (
                  <Tab
                    key={page.name}
                    label={page.name}
                    component={Link}
                    to={page.path}
                    value={page.path}
                  />
                ))}
              </Tabs>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </div>
  );
};

export default Header;
