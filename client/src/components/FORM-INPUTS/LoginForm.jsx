import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import Button from "../BUTTON/Button"

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <Stack sx={{justifyContent:"center", alignItems:"center", border:"2px solid red",}}>
        <TextField
          required
          id="outlined-username-input"
          label="Username"
          type='text'
        />
        <TextField
          required
          id="outlined-email-input"
          label="Email"
          type='text'
        />
        <TextField
        required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      <Button/>
      </Stack>
    </Box>
  );
}