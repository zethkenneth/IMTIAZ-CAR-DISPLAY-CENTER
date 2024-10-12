"use client";

import React, { useState } from "react";
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
  Flex,
} from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import useUserHooks from "@hooks/userhooks";
import AnimatedButton from "./AnimatedButton";

const SignOut = ({ isMini }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signOut } = useUserHooks();
  const [feedback, setFeedback] = useState(null);

  const handleSignOut = () => {
    signOut((status, message) => {
      if (!(status >= 200 && status < 300)) {
        return setFeedback(message);
      }

      router.push("/");

      onClose();
    });
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
            <Flex gap={5}>
              <AnimatedButton
                label="Cancel"
                variant="secondary"
                onClick={() => onClose()}
              />
              <AnimatedButton
                label="Proceed"
                loadingLabel="Signing out"
                _hover={{ bg: "darkorange" }}
                onClick={handleSignOut}
              />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignOut;
