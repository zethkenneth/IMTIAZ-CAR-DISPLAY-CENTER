import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Avatar, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DraggableProfilePictureUpload = ({ profilePicture, setProfilePicture }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [setProfilePicture]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Box
      {...getRootProps()}
      border="2px dashed"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      textAlign="center"
      cursor="pointer"
    >
      <input {...getInputProps()} />
      <VStack>
        <Avatar src={profilePicture} size="xl" />
        {isDragActive ? (
          <Text>Drop the files here ...</Text>
        ) : (
          <Text fontSize={12}>{`Drag 'n' drop a image here, or click to select one`}</Text>
        )}
      </VStack>
    </Box>
  );
};

DraggableProfilePictureUpload.propTypes = {
    profilePicture: PropTypes.any,
    setProfilePicture: PropTypes.func
}

export default DraggableProfilePictureUpload;
