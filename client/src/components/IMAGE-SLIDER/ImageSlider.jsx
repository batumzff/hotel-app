import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton, Typography, Stack } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useSwipeable } from "react-swipeable";
import { useSelector } from "react-redux";
import useRooms from "../../custom-hooks/useRooms";



// const images = [
//   {
//     src: "https://cdn.pixabay.com/photo/2023/08/01/06/19/iceberg-8162195_1280.jpg",
//     label: "Beautiful Nature",
//   },
//   {
//     src: "https://cdn.pixabay.com/photo/2024/05/04/01/25/white-tailed-eagle-8738135_640.jpg",
//     label: "City View",
//   },
//   {
//     src: "https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698475_640.jpg",
//     label: "Ocean",
//   },
//   {
//     src: "https://cdn.pixabay.com/photo/2022/10/11/12/38/dog-7514202_640.jpg",
//     label: "Forest",
//   },
// ];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const {rooms} = useSelector(state=>state.room)
  const totalImages = rooms.length;
  console.log(rooms)
  const {getRoomsInfo} = useRooms()

  useEffect(() => {
    
  
    getRoomsInfo()
  }, [])
  

  // Autoplay interval time in ms (3000 = 3 seconds)
  const autoPlayTime = 3000;

  // Handles the auto-play logic
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        handleNext();
      }, autoPlayTime);
      return () => clearInterval(timer);
    }
  }, [currentIndex, isHovered]);

  // Navigate to the previous image
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  }, [totalImages]);

  // Navigate to the next image
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  }, [totalImages]);

  // Swipe handling for mobile
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Box
      sx={{
        width: "80%",
        height: "500px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
      {...handlers}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slide */}
      {rooms.map((room, index) => (
        <Box
          key={index}
          component="img"
          src={room.image[0]}
          alt={room.roomNumber}
          sx={{
            display: currentIndex === index ? "block" : "none",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      ))}

      {/* Image Label */}
      <Box
        sx={{
          position: "absolute",
          bottom: "30px",
          left: "30px",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "10px 20px",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6">
          {rooms[currentIndex].roomNumber}
        </Typography>
      </Box>

      {/* Prev Button */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Pagination Dots */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {rooms.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: currentIndex === index ? "15px" : "10px",
              height: currentIndex === index ? "15px" : "10px",
              backgroundColor: currentIndex === index ? "#fff" : "#ccc",
              borderRadius: "50%",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ImageSlider;