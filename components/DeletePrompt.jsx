"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "./button";

const DeletePrompt = ({
  isOpen,
  onClose,
  handleSubmit,
  handleCancel,
  children,
}) => {
  const submit = (stopLoading) => {
    handleSubmit((success) => {
      if (success) {
        onClose();
      }
      stopLoading();
    });
  };

  return (
    <ModalComponent
      title="Delete Product"
      withCloseButton={true}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <Box mb={5}>
        <Text fontSize="lg" mb={4}>
          Are you sure you want to delete this product?
        </Text>
        {children}
      </Box>
      <Flex gap={5} justifyContent="flex-end" mt={6}>
        <ButtonComponent
          w="6rem"
          label="Delete"
          loadingLabel="Deleting..."
          style={{ backgroundColor: "red", color: "white" }}
          onClick={submit}
        />
        <ButtonComponent
          w="6rem"
          label="Cancel"
          variant="secondary"
          onClick={handleCancel}
        />
      </Flex>
    </ModalComponent>
  );
};

export default DeletePrompt;
