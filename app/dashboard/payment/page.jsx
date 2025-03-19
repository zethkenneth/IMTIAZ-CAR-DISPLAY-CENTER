"use client";

import React, { useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import ButtonComponent from "@components/button";
import usePaymentHook from "@hooks/paymenthook";
import ModalComponent from "@components/ModalComponent";
import { useRouter } from "next/navigation";

const PaymentDashboard = () => {
  const router = useRouter();
  const processButtonToggleRef = useRef(null);
  const { paymentCode, setPaymentCode, getOrderDetails, getPaymentDetails, checkoutURL, getPaymentUpdate } = usePaymentHook();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleViewOrder = (toggleLoading) => {
    if (!paymentCode) {
      toggleLoading && toggleLoading();
      return;
    }
    
    processButtonToggleRef.current = toggleLoading;
    
    getOrderDetails((status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        toggleLoading && toggleLoading();
        return console.log("Bad response.", { cause: feedback });
      }
      handlePaymentDetails();
      onOpen();
    });
  };

  const handlePaymentDetails = () => {
    getPaymentDetails((status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        return console.log("Bad response.", { cause: feedback });
      }
    });
  };

  return (
    <PageContainer>
      <Box 
        w="inherit" 
        h="80vh" 
        bg="white" 
        rounded={15} 
        boxShadow="md" 
        p={8}
        display="flex"
        justifyContent="center"
      >
        <Box maxW="500px" w="100%">
          <Heading size="lg" mb={4}>Payment Processing</Heading>
          <Text color="gray.500" fontSize="md" mb={8}>
            Enter the payment code to process the payment.
          </Text>
          
          <InputGroup size="md" mb={6}>
            <InputLeftElement
              pointerEvents="none"
              children="#"
              color="gray.500"
              fontSize="md"
            />
            <Input
              placeholder="Enter payment code"
              value={paymentCode || ''}
              onChange={(e) => setPaymentCode(e.target.value)}
              borderColor="gray.200"
              _hover={{ borderColor: 'gray.300' }}
              _focus={{ borderColor: 'orange.500', boxShadow: 'none' }}
              h="45px"
              fontSize="md"
            />
          </InputGroup>

          <ButtonComponent
            label="Process Payment"
            loadingLabel="Processing"
            onClick={handleViewOrder}
            style={{
              width: '100%',
              backgroundColor: '#E97F31',
              color: 'white',
              height: '45px',
              borderRadius: '6px',
              _hover: { backgroundColor: '#D66A1B' }
            }}
          />
        </Box>

        <ModalComponent 
          size="5xl" 
          isOpen={isOpen} 
          onClose={onClose}
          footer={
            <Flex justifyContent="end">
              <ButtonComponent 
                label="Close"
                onClick={() => {
                  getPaymentUpdate((status, feedback) => {
                    if (!(status >= 200 && status < 300)) {
                      return console.log("Bad response.", { cause: feedback });
                    }
                    setPaymentCode('');
                    onClose();
                    // Hard reload the page
                    window.location.reload();
                  });
                }}
                variant="secondary"
              />
            </Flex>
          }
        >
          {checkoutURL ? (
            <iframe
              src={checkoutURL}
              width="100%"
              height="600px"
              title="PayMongo Payment"
              style={{ border: 'none' }}
            />
          ) : (
            <Flex justify="center" align="center" h="400px">
              <Text>Loading payment link...</Text>
            </Flex>
          )}
        </ModalComponent>
      </Box>
    </PageContainer>
  );
};

export default PaymentDashboard; 