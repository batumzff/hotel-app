import React, { forwardRef, useImperativeHandle } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography } from "@mui/material";

const SelectOption = forwardRef(({ id, label, value, rooms = [] }, ref) => {
  const [choice, setChoice] = React.useState("");

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

useImperativeHandle (ref, ()=>({getBedType: ()=> choice})
)
  console.log("rooms in select option", rooms);
  console.log("room in select option", choice);
  return (
    <Box
      sx={{ border: "2px solid gray", borderRadius: ".5rem", padding: "1rem" }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        {rooms ? (
          <React.Fragment>
            <InputLabel id={"demo-simple-select-helper-label"}>
              Rooms
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={choice}
              label={label}
              onChange={handleChange}
            >
              {rooms?.map((room) => (
                <MenuItem
                  value={room._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    position: "relative",
                    "&:hover .hoverImage": {
                      opacity: 1,
                    },
                  }}
                >
                  <Box>
                    <Typography variant="body1">{room.roomNumber}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {room.bedType}
                    </Typography>
                  </Box>
                  <Box
                    className="hoverImage"
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 50,
                      height: 50,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      borderRadius: 4,
                    }}
                  >
                    <img
                      src={room.image[0]}
                      alt={room.roomNumber}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Comfort with Design</FormHelperText>{" "}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={choice}
              label={label}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>With label + helper text</FormHelperText>{" "}
          </React.Fragment>
        )}
      </FormControl>
    </Box>
  );
})

export default SelectOption