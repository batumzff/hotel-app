import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../assets/images/logo.png";
import logo1 from "../../assets/images/logo-1.png";
import { ListItemButton, Menu, MenuItem, Stack } from "@mui/material";
import useAuthCalls from "../../custom-hooks/useAuthCalls";
import Review from "../REVIEW/Review";

// ! styled elements for search part
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
// !--------------------------------------------

// ! Navigation
const navigation = [
  { name: "Home", to: "/" },
  { name: "Rooms", to: "/rooms" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "Profile", to: "/profile" },
  // { name: "Booking", to: "/booking" },
  // { name: "Login", to: "/login" },
  // { name: "Register", to: "/register" },
];
// !-------------------------------------------

const navbarNavigation = navigation.filter((item, index) => index < 5 && item);

export default function Navbar() {
  const { user, token } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout } = useAuthCalls();
  const navigate = useNavigate();

  console.log(user);
  // console.log(token);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
  };

  // console.log(navigation);

  // ! Drawer - Sidebar
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={logo1} alt="logo" width="150px" style={{ padding: "10px" }} />
      </Typography>
      <List>
        {navigation.map((item) => (
          <React.Fragment key={item.name}>
            <ListItemButton component={Link} to={item.to}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    if (e.target.textContent == "Profile") {
      navigate("/profile");
    } else if (e.target.textContent == "Log out") {
      token ? handleLogout() : navigate("/login");
    } else if (e.target.textContent == "Login") {
      navigate("/login");
    }

    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        {token ? "Log out" : "Login"}
      </MenuItem>
    </Menu>
  );

  const handleReview = () => {
    navigate("/messages");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "flex" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              src={logo}
              alt="logo"
              width="150px"
              style={{ padding: "10px" }}
            />
          </Typography>
          <Search sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navbarNavigation.map(
              (item) =>
                item.name !== "Profile" && (
                  <Link
                    to={item.to}
                    key={item.name}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginRight: "20px",
                    }}
                  >
                    {item.name}
                  </Link>
                )
            )}
          </Box>
          <Box sx={{ display: "flex" }}>
            {(user?.isAdmin || user?.isStaff) && (
              <Box onClick={handleReview}>
                {" "}
                <Review />
              </Box>
            )}

            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {(user  && user?.image) ? (
                <img
                  src={user?.image}
                  alt={user?.username}
                  width={50}
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
          {renderMenu}
        </Drawer>
      </Box>
    </Box>
  );
}
