import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box sx={{width:"100%", height:"100%", display: 'flex', justifyContent:"center", alignItems:"center" }}>
      <CircularProgress />
    </Box>

  )
}

export default Loading