"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import ButtonComponent from "@components/button";
import usePaymentHook from "@hooks/paymenthook";
import ModalComponent from "@components/ModalComponent";
import { useRouter } from "next/navigation";
import PaymentMethodSelect from "@components/PaymentMethodSelect";
import CashPaymentModal from "@components/CashPaymentModal";
import axios from "axios";
import CheckoutModal from "@components/CheckoutModal";

const PaymentDashboard = () => {
  const router = useRouter();
  const processButtonToggleRef = useRef(null);
  const { 
    paymentCode, 
    setPaymentCode, 
    orderDetails,
    getOrderDetails, 
    getPaymentDetails, 
    checkoutURL, 
    getPaymentUpdate 
  } = usePaymentHook();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [showCashModal, setShowCashModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleViewOrder = (toggleLoading) => {
    if (!paymentCode || paymentCode.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a payment code",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      if (toggleLoading) toggleLoading();
      return;
    }
    
    processButtonToggleRef.current = toggleLoading;
    
    getOrderDetails((status, feedback) => {
      try {
        if (!(status >= 200 && status < 300)) {
          toast({
            title: "Error",
            description: "Invalid payment code",
            status: "error",
            duration: 3000,
            isClosable: true
          });
          return;
        }

        if (paymentMethod === "CASH") {
          setShowCashModal(true);
        } else {
          handlePaymentDetails();
          onOpen();
        }
      } catch (error) {
        console.error('Error in handleViewOrder:', error);
        toast({
          title: "Error",
          description: "An error occurred while processing the payment",
          status: "error",
          duration: 3000,
          isClosable: true
        });
      } 
    });
  };

  const handlePaymentDetails = () => {
    getPaymentDetails((status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        return console.log("Bad response.", { cause: feedback });
      }
    });
  };

  const handleClosePayment = () => {
    getPaymentUpdate((status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        onClose();
        setPaymentCode('');
        return;
      }
      
      // Check if payment was actually completed
      if (feedback?.paymentStatus === "completed" || feedback?.status === "paid") {
        toast({
          title: "Success",
          description: "Payment processed successfully",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }
      
      setPaymentCode('');
      onClose();
      window.location.reload();
    });
  };

  const handleSimpleClose = () => {
    setPaymentCode('');
    onClose();
  };

  const handleCashPayment = async (cashReceived, change) => {
    try {
      const response = await axios.post(`/api/imtiaz/payments/cash`, {
        paymentCode,
        cashReceived,
        change
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Cash payment processed successfully",
          status: "success",
          duration: 3000,
          isClosable: true
        });
        setShowCashModal(false);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process cash payment",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handlePaymentComplete = (checkoutURL) => {
    setShowCheckoutModal(false);
    if (checkoutURL) {
      // For online payment, show the PayMongo modal
      onOpen();
    } else {
      // For cash payment, redirect to transaction page
      router.push('/dashboard/transaction');
    }
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
              color="gray.500"
              fontSize="md"
            >
              #
            </InputLeftElement>
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

          <PaymentMethodSelect 
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

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
              marginTop: '20px',
              _hover: { backgroundColor: '#D66A1B' }
            }}
          />
        </Box>

        <ModalComponent 
          size="5xl" 
          isOpen={isOpen} 
          onClose={handleSimpleClose}
          footer={
            <Flex justifyContent="end">
              <ButtonComponent 
                label="Close"
                onClick={handleClosePayment}
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

        <CashPaymentModal
          isOpen={showCashModal}
          onClose={() => setShowCashModal(false)}
          totalAmount={orderDetails?.totalAmount || 0}
          onConfirm={handleCashPayment}
        />

        <CheckoutModal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          orderDetails={orderDetails}
          paymentCode={paymentCode}
          onPaymentComplete={handlePaymentComplete}
          returnPath="/dashboard/transaction"
        />
      </Box>
    </PageContainer>
  );
};

export default PaymentDashboard; 