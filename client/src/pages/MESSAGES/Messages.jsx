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

  const rows = message?.map((msg) => ({
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
    setSelectedIds(
      (prevIds) =>
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
