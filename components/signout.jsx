"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";

const SignOut = ({ isMini }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    router.push("/");
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="red"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        rounded="full"
        _hover={{ bg: "gray.600" }}
      >
        {!isMini && "Signout"}
        <Icon as={FaSignOutAlt} h={7} w={7} ml={2} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Sign Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to sign out?</ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleSignOut}>
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignOut;
