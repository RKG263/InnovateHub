import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ExitToApp } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logout } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../Blog/SearchBox";
import MyBlogs from "../../Pages/Blogpage/MyBlogs";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };
  const path = useLocation().pathname;

  const isActiveLink = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <div className="mb-[4.3rem]">

    <AppBar position="fixed"
      className=""
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "50px", marginRight: "10px" }}
            />
          </Link>

            <Stack className="max-md:hidden">
              <Typography variant="h4" sx={{ fontWeight: "bold" }}
                  className=" max-lg:text-[30px]"
              >
                InnovatorsHub
              </Typography>
            </Stack>
        </Box>

        {path==='/posts' || path==='/my-posts'? 
        <Box sx={{ display: "flex", alignItems: "center" }}>
          
          <SearchBox/>

          
          {isAuthenticated ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/create-post" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Post
              </Button>
            </Link>
            <Link to="/my-posts" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                myPosts
              </Button>
            </Link>
            
           
              {/* <Link to={`/profile/${user._id}`}> */}
              <Link to={`/dashboard`}>
                <IconButton
                  edge="end" 
                  color="inherit"
                  aria-label="profile"
                  size="large"
                >
                  <Avatar 
                    src={user?.profile_pic?.url}
                  />
                </IconButton>
              </Link>
              <IconButton
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}
              >
                <ExitToApp />
              </IconButton>
            </Box>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                 sx={{
                  color: "white",
                  textDecoration: isActiveLink('/login') ? "underline" : "none", // Underline when active
                  "&:hover": {
                    backgroundColor: isActiveLink('/login') ? "#303f9f" : "transparent", // Dark blue background when active
                  },
                }}
              >
                Log In
              </Button>
            </Link>
          )}
        </Box> : 
        <>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                textDecoration: isActiveLink("/") ? "underline" : "none", // Underline when active
                "&:hover": {
                  backgroundColor: isActiveLink("/")
                    ? "#303f9f"
                    : "transparent", // Dark blue background when active
                },
              }}
            >
              HOME
            </Button>
          </Link> */}




          <Link to="/about" style={{ textDecoration: "none" }}
            className="max-sm:hidden"
          >
            <Button
              sx={{
                color: "white",
                textDecoration: isActiveLink("/about") ? "underline" : "none", // Underline when active
                "&:hover": {
                  backgroundColor: isActiveLink("/about")
                    ? "#303f9f"
                    : "transparent", // Dark blue background when active
                },
              }}
            >
              About Us
            </Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}
            className="max-sm:hidden"
          >
            <Button
              sx={{
                color: "white",
                textDecoration: isActiveLink("/contact") ? "underline" : "none", // Underline when active
                "&:hover": {
                  backgroundColor: isActiveLink("/contact")
                    ? "#303f9f"
                    : "transparent", // Dark blue background when active
                },
              }}
            >
              Contact Us
            </Button>
            
          </Link>
          <Link to="/posts" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                textDecoration: isActiveLink("/posts") ? "underline" : "none", // Underline when active
                "&:hover": {
                  backgroundColor: isActiveLink("/posts")
                    ? "#303f9f"
                    : "transparent", // Dark blue background when active
                },
              }}
            >
              Posts
            </Button>
            
          </Link>
          {isAuthenticated ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to={`/dashboard`}>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="profile"
                  size="large"
                >
                  <Avatar 
                    src={user?.profile_pic?.url}
                  />
                </IconButton>
              </Link>
              <IconButton
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}
              >
                <ExitToApp />
              </IconButton>
            </Box>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Log In
              </Button>
            </Link>
          )}
        </Box>
        </>
        
        
        }
        
      </Toolbar>
    </AppBar>
    </div>
  );
};

export default Header;
