import React, { useState } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";

const FileUpload = ({ onFilesSelected }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    if (onFilesSelected) {
      onFilesSelected(selectedFiles);
    }
  };

  return (
    <Box
      border="2px dashed #CBD5E0"
      borderRadius="md"
      p={4}
      textAlign="center"
      position="relative"
    >
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        opacity="0"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        width="100%"
        height="100%"
        cursor="pointer"
      />
      <Text mb={2}>
        Drag and drop your files here, or click to select files
      </Text>
      {files.length > 0 && (
        <Box mt={4}>
          <Text fontWeight="bold">Selected Files:</Text>
          {files.map((file, index) => (
            <Text key={index}>{file.name}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
