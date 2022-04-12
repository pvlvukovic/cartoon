import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link, matchPath, Outlet, useLocation } from "react-router-dom";

export const pages = [
  {
    name: "Characters",
    path: "/",
  },
  {
    name: "Locations",
    path: "/locations",
  },
];

const useRouteMatch = (patterns: readonly string[]): string | undefined => {
  const { pathname } = useLocation();

  return patterns.find((pattern) => matchPath(pattern, pathname));
};

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

  const currentTab = useRouteMatch(pages.map((page) => page.path));

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
                    role="link"
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
                    role="link"
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
