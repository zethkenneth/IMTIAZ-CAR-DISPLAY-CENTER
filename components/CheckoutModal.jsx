import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  SimpleGrid,
  Box,
  Text,
  useToast
} from '@chakra-ui/react';
import PaymentMethodSelect from './PaymentMethodSelect';
import CashPaymentModal from './CashPaymentModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CheckoutModal = ({ isOpen, onClose, orderDetails, paymentCode, onPaymentComplete, returnPath = '/' }) => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [showCashModal, setShowCashModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedPayment = async () => {
    // Validate customer information
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check if customer exists by first name and last name
      const checkCustomerResponse = await axios.get('/api/imtiaz/customers/check', {
        params: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName
        }
      });

      let customerId;
      
      if (checkCustomerResponse.data.status === 200) {
        // Customer exists, use existing ID
        customerId = checkCustomerResponse.data.customerId;
      } else if (checkCustomerResponse.data.status === 404) {
        // Customer not found, create new customer
        const createCustomerResponse = await axios.post('/api/imtiaz/customers', customerInfo);
        if (createCustomerResponse.data.status === 200) {
          customerId = createCustomerResponse.data.customerId;
        } else {
          throw new Error("Failed to create new customer");
        }
      } else {
        throw new Error("Failed to check customer existence");
      }

      if (!customerId) {
        throw new Error("Failed to get or create customer ID");
      }

      // Update order with customer ID
      await axios.put(`/api/imtiaz/orders/${orderDetails.orderID}`, {
        customerId: customerId
      });

      if (paymentMethod === "CASH") {
        setShowCashModal(true);
      } else {
        // Proceed with online payment
        const paymentResponse = await axios.get('/api/imtiaz/payments', {
          params: { code: paymentCode }
        });
        onPaymentComplete(paymentResponse.data.checkoutURL);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to process payment",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCashPayment = async (cashReceived, change) => {
    try {
      await axios.post('/api/imtiaz/payments/cash', {
        paymentCode,
        cashReceived,
        change
      });

      toast({
        title: "Success",
        description: "Cash payment processed successfully",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      // Navigate based on returnPath
      router.push(returnPath);
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Checkout Information</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={4} fontWeight="bold">Customer Information</Text>
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </SimpleGrid>
                <FormControl isRequired mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>

              <Box w="100%" mt={4}>
                <Text mb={4} fontWeight="bold">Payment Method</Text>
                <PaymentMethodSelect
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleProceedPayment}
              isLoading={isLoading}
              loadingText="Processing"
            >
              Proceed to Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CashPaymentModal
        isOpen={showCashModal}
        onClose={() => setShowCashModal(false)}
        totalAmount={orderDetails?.totalAmount || 0}
        onConfirm={handleCashPayment}
      />
    </>
  );
};

export default CheckoutModal; 