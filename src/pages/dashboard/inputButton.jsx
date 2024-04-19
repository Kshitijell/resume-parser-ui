import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ handleFileChange, uploadResume }) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      loading={uploadResume}
      startIcon={uploadResume ? <CircularProgress size={15} /> : null}
      sx={{
        textTransform:'none',
        fontSize: '1.25rem',
        backgroundColor: "#1976d2",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#115293",
        },
        "&:focus": {
          outline: "none",
        },
        "&:active": {
          backgroundColor: "#0b5ea2",
        },
      }}
    >
      Upload Resume
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange}
        accept="application/pdf,.docx"
        multiple
      />
    </Button>
  );
}

InputFileUpload.propTypes = {
  handleFileChange: PropTypes.func,
  uploadResume: PropTypes.bool,
};
