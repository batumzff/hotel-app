import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

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

const roomOptions = ["Single Room", "Double Room", "Family Room", "KING Room"];

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // console.log("e.target.value: ", e.target.value);
    const filtered = roomOptions.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // console.log("filtered in change: ",filtered);
    setFilteredOptions(filtered);

    setShowSuggestions(searchTerm.length > 0 && filtered.length > 0);
  };

  const handleOptionClick = (option) => {
    setShowSuggestions(false);
    //  console.log(option);

    const filtered = roomOptions.filter((room) =>
      room.toLowerCase().includes(option.toLowerCase())
    );

    // console.log("filtered: ", filtered);
    navigate("/rooms", { state: { from: filtered[0] } });
    setTimeout(() => {
      setSearchTerm("");
    }, 500);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 300);
  };

  return (
    <Box position="relative">
      <Search sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for rooms…"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm || ""}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(filteredOptions.length > 0)}
          onBlur={handleBlur}
        />
      </Search>

      {showSuggestions && (
        <Box
          sx={{
            position: "absolute",
            top: "40px",
            backgroundColor: "#5398DD",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            zIndex: 1000,
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filteredOptions.map((option, index) => (
            <Box
              key={index}
              sx={{
                padding: "8px 16px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: alpha("#1976d2", 0.15),
                },
              }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Searchbar;