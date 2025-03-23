import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Box,
  Text,
  useToast
} from '@chakra-ui/react';
import PaymentMethodSelect from './PaymentMethodSelect';
import CashPaymentModal from './CashPaymentModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CheckoutModal = ({ isOpen, onClose, orderDetails, paymentCode, onPaymentComplete, returnPath = '/' }) => {
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [showCashModal, setShowCashModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleProceedPayment = async () => {
    setIsLoading(true);
    try {
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
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Method</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={4} fontWeight="bold">Total Amount: {orderDetails?.totalAmount}</Text>
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