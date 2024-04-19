import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const DragAndDropZone = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (onFileUpload && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "file/pdf": [".pdf"] },
  });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p style = {{fontSize: '1.25rem'}}>Drag and drop a file here, or click to select a file</p>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #000",
  backgroundColor: "#fff",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default DragAndDropZone;

DragAndDropZone.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};
