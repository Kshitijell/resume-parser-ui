import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DragAndDropZone from "./dragDropZone";
import InputFileUpload from "./inputButton";


function ScreenComponent() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [requisitionId, setRequisitionId] = useState("");
  const [uploadResume, setUploadResume] = useState(false);
  const [formError, setFormError] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requisitionId.length === 0) {
      setFormError("Please provide a requisition ID.");
    } else {
      setTableLoading(true);
    


      const formData = new FormData();
      formData.append("rec_id", requisitionId);
      if (uploadedFiles) {
        formData.append("file", uploadedFiles);
      }
      setFormError(null);
      setUploadedFiles(null);
      setRequisitionId("");
      try {
        const res = await axios.post(
          "http://192.168.1.105:5000/upload",
          formData
        );
        if (res.data) {
          const resData = res.data.data;
          toast.success("JD Uploaded.");
          navigate("/table", { state: resData });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Something went wrong.");
      } finally {
        setTableLoading(false);
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFiles(null);
  };


  const handleFileChange = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const files = event?.target?.files;
    files.forEach(element => {
      formData.append("file", element);
      
    });
   
    if (files.length > 0) {
      setUploadResume(true);
      try {
        const res = await axios.post(
          "http://192.168.1.105:5000/upload_resume",
          formData
        );
        if (res) {
          toast.success("Resume(s) Uploaded.");
        }
      } catch (error) {
        console.error("Error uploading file(s):", error);
        toast.error("Something went wrong.");
      } finally {
        setUploadResume(false);
      }
    }
    event.target.value = ""; // Clear the input field after uploading files
  };

  

  return (
    <Box sx={{ height: "calc(100vh - 120px)", position: "relative", width: 1 }}>
      <Box
        sx={{
          top: 0,
          backgroundColor: "#02021E",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100px",
        }}
      >
        <img
          src="/ell-logo.svg"
          alt="Ell Logo"
          style={{ width: "150px", height: "50px", marginLeft: "30px" }}
        />
      </Box>

      <Box
        flex={1}
        sx={{
          height: "100%",
          position: "relative",
          backgroundImage: "url(/overview.svg)",
          backgroundSize: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            backgroundImage: "url(/backgroundForm.svg)",
            backgroundSize: "100% 100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "40%",
          }}
        >
          <Typography variant="h5" align="center" color="#fff" gutterBottom>
            RecruitSmart
          </Typography>
          <Card
            sx={{
              backgroundColor: "#575680",
              marginTop: "10px",
              width: "50%",
              // padding: "40px",
              paddingX: "40px",
              paddingY: "20px",
              borderRadius: "30px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography style={{ color: "#fff" }}>
                Requisition Id*
              </Typography>

              <TextField
                id="requisitionId"
                fullWidth
                value={requisitionId}
                helperText="Enter an Alphanumeric ID e.g. ABC123"
                size="small"
                onChange={(e) => setRequisitionId(e.target.value)}
                sx={{
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    "& fieldset": {
                      borderWidth: "2px",
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#fff",
                    marginLeft: 0,
                  },
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography style={{ color: "#fff" }}>Upload JD</Typography>
              <DragAndDropZone onFileUpload={handleFileUpload} />
              {uploadedFiles && (
                <Box
                  sx={{ display: "flex", alignItems: "center", color: "#fff" }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "300px",
                    }}
                  >
                    <Tooltip title={uploadedFiles.path}>
                      {`Filename : ${uploadedFiles?.path}`}
                    </Tooltip>
                  </Typography>
                  <IconButton onClick={handleRemoveFile} size="small">
                    <Cancel color="#fff" />
                  </IconButton>
                </Box>
              )}
              {formError && (
                <Typography
                  sx={{ color: "#FFAB00", marginTop: "5px" }}
                  variant="body1"
                >
                  {formError}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <InputFileUpload
                handleFileChange={handleFileChange}
                uploadResume={uploadResume}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                startIcon={tableLoading ? <CircularProgress size={15} /> : null}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={tableLoading} sx={{textTransform:'none'}}
              >
                Recommend Best Candidate(s)
              </Button>
            </Box>
            
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default ScreenComponent;
