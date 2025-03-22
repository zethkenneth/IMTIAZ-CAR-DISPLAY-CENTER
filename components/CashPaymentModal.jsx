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
  Text,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import formatPrice from "@utils/formatprice";

const CashPaymentModal = ({ isOpen, onClose, totalAmount, onConfirm }) => {
  const [cashReceived, setCashReceived] = useState("");
  
  // Convert totalAmount to number and handle potential string input
  const numericTotalAmount = parseFloat(totalAmount) || 0;
  const change = cashReceived ? parseFloat(cashReceived) - numericTotalAmount : 0;

  const handleConfirm = () => {
    if (parseFloat(cashReceived) >= numericTotalAmount) {
      onConfirm(cashReceived, change);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cash Payment</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Amount Due</FormLabel>
              <Input value={formatPrice(numericTotalAmount)} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Cash Received</FormLabel>
              <Input
                type="number"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                placeholder="Enter amount"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Change</FormLabel>
              <Input value={formatPrice(change)} isReadOnly />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="green"
              onClick={handleConfirm}
              isDisabled={parseFloat(cashReceived) < numericTotalAmount}
            >
              Confirm Payment
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CashPaymentModal;
