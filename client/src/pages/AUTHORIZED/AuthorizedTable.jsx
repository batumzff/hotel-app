import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useMediaQuery, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const AuthorizedTable = ({columns, rows, dropdownLabel = "Item", renderDropdownItem, tableHeight = 400}) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [selected, setSelected] = useState('');

    const handleSelectChange = (e) => {
        setSelected(e.target.value);
      };

  return (
     <Box sx={{backgroundColor:`${isSmallScreen ? "" : "rgba(255, 255, 255, 0.5)"}`}}>
      {isSmallScreen ? (
        <FormControl fullWidth>
          <InputLabel>{dropdownLabel}</InputLabel>
          <Select value={selected} onChange={handleSelectChange} label={dropdownLabel} sx={{width:"10rem"}}>
            {rows.map((row) => (
              <MenuItem key={row.id} value={row.id}>
                 {renderDropdownItem(row)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Box sx={{ height: tableHeight, width: '100%', overflowX: 'auto' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} autoHeight />
        </Box>
      )}
    </Box>
  )
}

export default AuthorizedTable