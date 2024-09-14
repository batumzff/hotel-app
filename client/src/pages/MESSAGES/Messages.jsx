// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button, Checkbox, CircularProgress } from "@mui/material";
// import Paper from "@mui/material/Paper";
// import useMessages from "../../custom-hooks/useMessages";
// import { useSelector } from "react-redux";
// import MyButton from "../../components/FORM-INPUTS/MyButton";
// import useAxios from "../../custom-hooks/useAxios";

// const paginationModel = { page: 0, pageSize: 5 };

// const Messages = () => {
//   const { getMessageInfo } = useMessages();
//   const { message } = useSelector((state) => state.message);
//   const { axiosWithToken } = useAxios();

//   useEffect(() => {
//     getMessageInfo();
//   }, []);
//   // console.log(message);
//   // const columns = [
//   //   // { field: 'id', headerName: 'ID', width: 70 },
//   //   // { field: 'firstName', headerName: 'First Name', width: 130 },
//   //   // { field: 'lastName', headerName: 'Last Name', width: 130 },
//   //   { field: 'username', headerName: 'User Name', width:130,  headerAlign: 'center',
//   //     align: 'center', display:"flex", justifyContent:"center", alignItems:"center" },

//   //   {
//   //     field: 'content',
//   //     headerName: 'Message',
//   //     description: 'This column has a value getter and is not sortable.',
//   //     sortable: false,
//   //     flex: 2,
//   //     headerAlign: 'center',
//   //     align: 'center',
//   //     valueGetter: (value,rows) => `${rows.message || ''}`,
//   //   },

//   //   {
//   //     field: "isRead",
//   //     headerName: "Read",
//   //     width: 100,
//   //     renderCell: (params) => (
//   //       <Checkbox
//   //         checked={params.row.isRead}
//   //         onChange={() => handleCheckboxToggle(params.row.id)}
//   //         color="primary"
//   //       />
//   //     ),
//   //     headerAlign: "center",
//   //     align: "center",
//   //   }
//   // ];

//    const rows = message?.map(msg => (
//     {
//          id:msg._id, firstName:msg.userId?.firstName, lastName:msg.userId?.lastName, username:msg.userId?.username, message:msg.content
//        }
//    )) || [{username:"",message:"There is no message to read"}]

//   console.log(message);

//   const [select, setSelect] = useState(
//     message?.map(msg => (
//       {
//            id:msg._id,  message:msg.content, isRead:msg.isRead
//          }
//      ))
//   );
//   const [loading, setLoading] = useState(false); // Track loading state for the submit button

//   const [selectedIds, setSelectedIds] = useState([]); // Track selected message IDs

//   // Function to handle read checkbox toggle
//   const handleCheckboxToggle = (id) => {
//     setSelect((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, isRead: !row.isRead } : row
//       )
//     );
//   };

//   const handleRowSelection = (e) => {
//     // setSelectedIds(newSelection); // Update the selected message IDs
//    console.log(e.target)
//   };
//   console.log(selectedIds);
//   // Function to handle submission (API call)
//   const handleSubmit = async () => {
//     setLoading(true);

//     try {
//       // Make the API call to update the read status
//       await axiosWithToken.post("messages/unread", { messageIds: selectedIds });

//       // Update local state to mark the selected rows as read
//       setSelect((prevRows) =>
//         prevRows.map((row) =>
//           selectedIds.includes(row.id) ? { ...row, isRead: true } : row
//         )
//       );

//       // alert("Messages updated successfully!");
//     } catch (error) {
//       console.error("Failed to update messages:", error);
//       // alert("An error occurred while updating messages.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns = [
//     {
//       field: "username",
//       headerName: "User Name",
//       width: 130,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "id",
//       headerName: "ID",
//       width: 50,
//       headerAlign: "center",
//       align: "center",
      
//     },
//     {
//       field: "message",
//       headerName: "Message",
//       flex: 2,
//       sortable: false,
//       headerAlign: "center",
//       align: "center",
//       renderCell: (params) => (
//         <div
//           style={{
//             whiteSpace: "normal",
//             wordBreak: "break-word",
//             textAlign: "left",
//           }}
//         >
//           {params.value}
//         </div>
//       ), // This makes sure the message wraps on smaller screens
//     },
//     {
//       field: "isRead",
//       headerName: "Read",
//       width: 100,
//       renderCell: (params) => (
//         <Checkbox
//           checked={params.row.isRead}
//           onChange={() => handleCheckboxToggle(params.row.id)}
//           color="primary"
//         />
//       ),
//       headerAlign: "center",
//       align: "center",
//     },
//   ];

//   return (
//     <Paper sx={{ m: "3rem 0", p: "1rem", height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         disableSelectionOnClick
//         getRowHeight={() => "auto"}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10]}
//         // checkboxSelection
//         sx={{ border: 0, columnCount: { sm: 2 } }}
//         autoHeight
//         // onSelectionModelChange={() => handleRowSelection()}
//         onClick={handleRowSelection}
//       />
//       <MyButton
//         //  variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         style={{ margin: "1rem auto" }}
//         disabled={loading}
//       >
//         {loading ? <CircularProgress size={24} /> : "Submit Read Status"}
//       </MyButton>
//     </Paper>

//     //   <Paper sx={{m:"3rem 0", p:"1rem", height: 400, width: '100%' }}>
//     //   {/* DataGrid component */}
//     //   <DataGrid
//     //     rows={rows}
//     //     columns={columns}
//     //     // checkboxSelection
//     //     disableSelectionOnClick // This disables the default checkbox selection column
//     //     onSelectionModelChange={(newSelection) => handleRowSelection(newSelection)}
//     //     initialState={{ pagination: { paginationModel } }}
//     //     pageSizeOptions={[5, 10]}
//     //     getRowClassName={(params) => (params.row.isRead ? "read-row" : "")} // Optional: Add class based on read status
//     //     autoHeight // Allows the DataGrid to grow with content height
//     //   />

//     //   {/* Submit Button */}
//     //   {/* <Button
//     //     variant="contained"
//     //     color="primary"
//     //     onClick={handleSubmit}
//     //     sx={{ marginTop: "1rem" }}
//     //     disabled={loading}
//     //   >
//     //     {loading ? <CircularProgress size={24} /> : "Submit Read Status"}
//     //   </Button> */}
//     //  <MyButton
//     // //  variant="contained"
//     //  color="primary"
//     //  onClick={handleSubmit}
//     //  style={{ margin : "1rem auto" }}
//     //  disabled={loading}
//     //  >
//     //   {loading ? <CircularProgress size={24} /> : "Submit Read Status"}
//     //   </MyButton>
//     // </Paper>
//   );
// };

// export default Messages;

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Checkbox, CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import useMessages from "../../custom-hooks/useMessages";
import { useSelector } from "react-redux";
import MyButton from "../../components/FORM-INPUTS/MyButton";
import useAxios from "../../custom-hooks/useAxios";

const paginationModel = { page: 0, pageSize: 5 };

const Messages = () => {
  const { getMessageInfo } = useMessages();
  const { message } = useSelector((state) => state.message);
  const { axiosWithToken } = useAxios();

  useEffect(() => {
    getMessageInfo();
  }, []);

  const rows =
    message?.map((msg) => ({
      id: msg._id,
      firstName: msg.userId?.firstName,
      lastName: msg.userId?.lastName,
      username: msg.userId?.username,
      message: msg.content,
      isRead: msg.isRead,
    })) || [{ username: "", message: "There is no message to read" }];

  const [selectedIds, setSelectedIds] = useState([]); // Track selected message IDs
  const [loading, setLoading] = useState(false); // Track loading state for the submit button

  // Function to handle read checkbox toggle
  const handleCheckboxToggle = (id) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((messageId) => messageId !== id) // Remove ID if already selected
        : [...prevIds, id] // Add ID if not selected
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Make the API call to update the read status
      await axiosWithToken.post("messages/unread", { messageIds: selectedIds });

      // Optionally, you can update the local state to mark selected rows as read
      getMessageInfo(); // Re-fetch the message data after updating read status
    } catch (error) {
      console.error("Failed to update messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "username",
      headerName: "User Name",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "message",
      headerName: "Message",
      flex: 2,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            textAlign: "left",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "isRead",
      headerName: "Read",
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={selectedIds.includes(params.row.id)} // Check if the row is selected
          onChange={() => handleCheckboxToggle(params.row.id)} // Handle checkbox toggle
          color="primary"
        />
      ),
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <Paper sx={{ m: "3rem 0", p: "1rem", height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        getRowHeight={() => "auto"}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0, columnCount: { sm: 2 } }}
        autoHeight
      />
      <MyButton
        color="primary"
        onClick={handleSubmit}
        style={{ margin: "1rem auto" }}
        disabled={loading || selectedIds.length === 0} // Disable if no messages are selected
      >
        {loading ? <CircularProgress size={24} /> : "Submit Read Status"}
      </MyButton>
    </Paper>
  );
};

export default Messages;

