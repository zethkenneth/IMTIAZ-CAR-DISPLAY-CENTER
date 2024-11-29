"use client";

import { useState } from "react";
import InputComponent from "./input";
import ModalComponent from "./ModalComponent";
import { HashtagIcon } from "@heroicons/react/24/outline";
import ButtonComponent from "./button";
import { useRouter } from "next/navigation";
import usePaymentHook from "@hooks/paymenthook";

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
  const {paymentCode, setPaymentCode, getOrderDetails, getPaymentDetails } = usePaymentHook();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [code, setCode] = useState();

  const data = {
    icon: <HashtagIcon className="h-5 w-5" />,
    name: "Payment code",
    label: "Payment code",
    type: "numeric",
    placeholder: "Enter payment code",
    value: paymentCode,
    setValue: setPaymentCode,
  };

  const handlePaymentDetails = () => {
    getPaymentDetails((status, feedback) => {
      if(!(status >= 200 && status < 300)){
        return console.log("Bad response.", {cause: feedback});
      }

      router.push(`/payment`);
    });
  }

  const handleViewOrder = (stopLoading) => {
    getOrderDetails((status, feedback) => {
      if(!(status >= 200 && status < 300)){
        return console.log("Bad response.", {cause: feedback});
      }
    });
    handlePaymentDetails();
  };

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
        <Flex w="100%" justifyContent="center">
          <Box>
            <Heading size="lg">Payment Code</Heading>
            <Text color='gray' fontSize={15} mt={2} mb={10}>
              A payment code is needed, this payment code is link to your order.
            </Text>
            <InputComponent key={data.name} {...data} />
            <Box mt={10}>
              <ButtonComponent
                label="Proceed"
                loadingLabel="Processing"
                withGradientColor={true}
                onClick={handleViewOrder}
              />
            </Box>
          </Box>
        </Flex>
      </ModalComponent>
    </>
  );
};

export default PaymentModal;
