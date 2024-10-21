import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Checkbox,
  CircularProgress,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
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
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [selected, setSelected] = useState("");

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

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
      await axiosWithToken.post("messages/unread", { messageIds: selectedIds });

      await getMessageInfo(); // Re-fetch the message data after updating read status
      setSelectedIds([]);
    } catch (error) {
      console.error("Failed to update messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const smallScreenSubmit = async (id) => {
    console.log("triggered");
   
    setSelectedIds(id
    );

    try {
      await axiosWithToken.post("messages/unread", { messageIds: selectedIds });
      await getMessageInfo();
    } catch (error) {
      console.error(error);
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
          checked={selectedIds.includes(params.row.id)}
          onChange={() => handleCheckboxToggle(params.row.id)}
          color="primary"
          sx={{
            color: params.row.isRead ? "green" : "red", // Custom color based on row data
            "&.Mui-checked": {
              color: params.row.isRead ? "green" : "red", // Custom checked color
            },
          }}
        />
      ),
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <Box
      sx={{
        // backgroundColor: `${isSmallScreen ? "" : "rgba(255, 255, 255, 0.5)"}`,
        m: "3rem 0",
        p: "1rem",
        height: 400,
        width: `${isSmallScreen ? "100%" : "calc(100vw - 220px)"}`,
        overflowX: 'auto'
      }}
    >
      {isSmallScreen ? (
        <FormControl fullWidth>
          <InputLabel>Messages</InputLabel>
          <Select
            value={selected}
            onChange={handleSelectChange}
            label="Messages"
            sx={{ width: "15rem" }}
          >
            {rows.map((row) => (
              <Box key={row.id}>
                <MenuItem value={row.id}>
                  {
                    <div style={{padding:".5rem", borderRadius:".8rem",backgroundColor: `${row.isRead ? "rgba(136, 194, 115, 0.5)" : "rgba(199, 37, 62, 0.5)"}`}}>
                      <div>ID: {row.id}</div>
                      <div>
                        Username:{" "}
                        <span
                          style={{ textDecoration: "underline", color: "blue" }}
                        >
                          {row.username}
                        </span>{" "}
                      </div>
                      <div
                        style={{
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          textAlign: "left"
                        }}
                      >
                        {row.message}
                      </div>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        {row.isRead ? (
                          <MyButton
                            onClick={() => smallScreenSubmit(row.id)}
                            style={{ backgroundColor: "red" }}
                          >
                            unRead
                          </MyButton>
                        ) : (
                          <MyButton
                            onClick={() => smallScreenSubmit(row.id)}
                            style={{ backgroundColor: "green" }}
                          >
                            isRead
                          </MyButton>
                        )}
                      </div>
                    </div>
                  }
                </MenuItem>
                <hr style={{ border: "2px solid gray" }} />
              </Box>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Paper
          sx={{
            m: "3rem 0",
            p: "1rem",
            height: 400,
            width: "100%",
            position: "relative",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            getRowHeight={() => "auto"}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            getRowClassName={(params) =>
              params.row.isRead ? "row-read" : "row-unread"
            }
            sx={{
              border: 0,
              columnCount: { sm: 2 },
              "& .row-read": {
                backgroundColor: "rgba(136, 194, 115, 0.5)",
                color: "black",
              },
              "& .row-unread": {
                backgroundColor: "rgba(199, 37, 62, 0.5)",
                color: "black",
              },
              // '&:hover': {backgroundColor:"#1976D2"}
            }}
            autoHeight
          />
          <MyButton
            color="primary"
            onClick={handleSubmit}
            style={{
              margin: "2.5rem auto",
              position: "absolute",
              left: "50%",
              bottom: "-30px",
              transform: "translateX(-50%)",
            }}
            disabled={loading || selectedIds.length === 0}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Read Status"}
          </MyButton>
        </Paper>
      )}
    </Box>
  );
};

export default Messages;