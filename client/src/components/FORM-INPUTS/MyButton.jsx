import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function MyButton({children, ...props}) {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Button variant="contained" {...props}>{children}</Button>
    </Stack>
  );
}