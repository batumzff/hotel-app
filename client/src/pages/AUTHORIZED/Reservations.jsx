import React from 'react'
import { Box } from '@mui/material';
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AuthorizedTable from './AuthorizedTable';



const paginationModel = { page: 0, pageSize: 5 };

const Reservations = () => {
  const { reservations } = useSelector(state => state.authorized)

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            borderRadius:"50%"
          }}
        />
      ),
    },
    { field: 'bedType', headerName: 'Type', width: 90 },
    { field: 'arrival_date', headerName: 'Arrival', width: 90 },
    { field: 'departure_date', headerName: 'Departure', width: 90 },
    {
      field: 'totalPrice',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
    {
      field: 'username',
      headerName: 'Username',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
    }
  ];
  
  const rows = reservations?.map(reservation => ({
    id:reservation._id,
    image: reservation.roomId?.image[0],
    bedType: reservation.roomId?.bedType,
    arrival_date : reservation.arrival_date,
    departure_date : reservation.departure_date,
    totalPrice: reservation.totalPrice,
    username: reservation.userId?.username
  }))

  console.log(reservations);
  return (
    <AuthorizedTable
    columns={columns}
    rows={rows}
    dropdownLabel="Reservations"
    renderDropdownItem={(row) => (
      <div>
        <div>ID: {row.id}</div>
        <div>{row.username}</div>
        <div>(type: {row.bedType}) </div>
        <div>(Arrival: {row.arrival_date})</div>
        <div>(Departure: {row.departure_date})</div>
        <div>(price: {row.totalPrice})</div>
      </div>
    )}
    />
  )
}

export default Reservations