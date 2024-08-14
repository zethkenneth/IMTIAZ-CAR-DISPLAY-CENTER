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
  function submit(stopLoading) {
    handleSubmit(pin.join(""), (status) => {
      if (!status) {
        stopLoading();
        return;
      }
      onClose();
      stopLoading();
    });
  }

  return (
    <ModalComponent
      title="Delete Product"
      withCloseButton={true}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      footer={
        <Flex gap={5}>
          <ButtonComponent w="6rem" label="Delete" onClick={submit} />
          <ButtonComponent
            w="6rem"
            label="Cancel"
            variant="secondary"
            onClick={handleCancel}
          />
        </Flex>
      }
    >
      <Box mb={5}>{children}</Box>
    </ModalComponent>
  );
};

export default DeletePrompt;
