"use client";

import { useState } from "react";
import InputComponent from "./input";
import ModalComponent from "./ModalComponent";
import { HashtagIcon } from "@heroicons/react/24/outline";
import ButtonComponent from "./button";
import { useRouter } from "next/navigation";

const {
  useDisclosure,
  Box,
  Heading,
  Button,
  Flex,
  Text,
} = require("@chakra-ui/react");

const PaymentModal = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [code, setCode] = useState();

  const data = {
    icon: <HashtagIcon className="h-6 w-6" />,
    name: "Payment code",
    label: "Payment code",
    type: "numeric",
    placeholder: "Enter payment code",
    value: code,
    setValue: setCode,
  };

  const handleCheckOrder = (stopLoading) => {};

  return (
    <>
      <Button
        w="6rem"
        rounded={25}
        bg="black"
        color="white"
        size="sm"
        _hover={{ bg: "black" }}
        onClick={() => onOpen()}
      >
        Payment
      </Button>
      <ModalComponent isOpen={isOpen} onClose={onClose} withCloseButton={true}>
        <Flex w="100%" justifyContent="center" textAlign="center">
          <Box>
            <Heading size="md">Payment Code</Heading>
            <Text mt={2} mb={10}>
              A payment code is needed, this payment code is link to your order.
            </Text>
            <InputComponent key={data.name} {...data} />
            <Box mt={10}>
              <ButtonComponent
                label="Proceed"
                loadingLabel="Checking order"
                onClick={() => router.push("/payment")}
              />
            </Box>
          </Box>
        </Flex>
      </ModalComponent>
    </>
  );
};

export default PaymentModal;
