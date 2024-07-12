"use client";

import { Box, List, ListItem, ListItemText } from "@mui/material";
import { InputFileUpload } from "@/shared/components";
import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = "http://localhost:8000";

export default function Home() {
  const [files, setFiles] = useState([]);

  const fetchFiles = () => {
    axios
      .get("/file_uploads/files/")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/file_uploads/upload/", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        height: "100vh",
        width: "100vw",
      }}
    >
      <InputFileUpload handleFileUpload={handleFileUpload} />

      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file.file} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
