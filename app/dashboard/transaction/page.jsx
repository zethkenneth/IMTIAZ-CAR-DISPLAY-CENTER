"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import ModalComponent from "@components/ModalComponent";
import useOrderHooks from "@hooks/orderhooks";
import axios from "axios";
import PageContainer from "@components/PageContainer";

const Transaction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { transactions, getTransactions } = useOrderHooks();
  const [order, setOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  function handleSelectOrder(order) {
    setOrder(order);
    onOpen();
  }

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (transactions.length === 0) {
      getTransactions(cancelToken.token, (status, feedback) => {
        switch (status) {
          case 200:
            console.log(feedback);
            break;
          default:
            console.log(feedback);
        }
      });
    }

    return () => cancelToken.cancel();
  }, []);

  return (
    <PageContainer>
      <Box 
        w="inherit" 
        h="80vh" 
        bg="white" 
        rounded={15} 
        boxShadow="md" 
        p={4}
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="2xl" mb={4}>
          Transactions
        </Text>
        
        <Box overflowY="auto" flex="1">
          <Table variant="striped" colorScheme="orange">
            <Thead position="sticky" top={0} bg="white" zIndex={1}>
              <Tr>
                <Th textAlign="center">Transaction ID</Th>
                <Th textAlign="center">Payment Code</Th>
                <Th textAlign="center">Payment Method</Th>
                <Th textAlign="center">Payment Status</Th>
                <Th textAlign="center">Customer</Th>
                <Th textAlign="center">Order Date</Th>
                <Th textAlign="center">Status</Th>
                <Th textAlign="center">Total Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((order) => (
                <Tr
                  key={order.orderID}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleSelectOrder(order)}
                >
                  <Td textAlign="center">{order.orderID}</Td>
                  <Td textAlign="center">{order.paymentCode}</Td>
                  <Td textAlign="center">{order.paymentMethod }</Td>
                  <Td textAlign="center">{order.paymentStatus}</Td>
                  <Td textAlign="center">{order.customerName}</Td>
                  <Td textAlign="center">
                    {order?.orderDate
                      ? new Date(order.orderDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "NONE"}
                  </Td>
                  <Td textAlign="center">{order.status}</Td>
                  <Td textAlign="center">
                    {formatPrice(parseFloat(order.totalAmount).toFixed(2))}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Flex justifyContent="end" alignItems="center" gap={10} mt={4} p={2}>
          <Button
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
            colorScheme="orange"
          >
            <Text fontSize={13}>Previous</Text>
          </Button>
          <Text fontSize={14} fontWeight={600}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
            colorScheme="orange"
          >
            <Text fontSize={13}>Next</Text>
          </Button>
        </Flex>
      </Box>

      <ModalComponent
        title={"Order Details"}
        isOpen={isOpen}
        onClose={onClose}
        withCloseButton={true}
        size="5xl"
      >
        <Box overflowY="auto" maxH="60vh">
          <Flex gap={5}>
            <Flex gap={2}>
              <Text fontSize={13}>Payment Code</Text>
              <Text fontSize={13}>
                <strong>{order?.paymentCode ?? "NONE"}</strong>
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize={13}>Payment Status</Text>
              <Text fontSize={13}>
                <strong>{order?.paymentStatus ?? "NONE"}</strong>
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize={13}>Customer</Text>
              <Text fontSize={13}>
                <strong>{order?.customer ?? "NONE"}</strong>
              </Text>
            </Flex>
          </Flex>
          <Flex gap={5} mt={3}>
            <Flex gap={2}>
              <Text fontSize={13}>Order Date</Text>
              <Text fontSize={13}>
                <strong>{order?.orderDate ?? "NONE"}</strong>
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize={13}>Status</Text>
              <Text fontSize={13}>
                <strong>{order?.status ?? "NONE"}</strong>
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize={13}>Total Amount</Text>
              <Text fontSize={13}>
                <strong>{order?.totalAmount ?? "NONE"}</strong>
              </Text>
            </Flex>
          </Flex>
          
          <Table mt={5} variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th textAlign="center">Product ID</Th>
                <Th textAlign="center">Product Name</Th>
                <Th textAlign="center">Model</Th>
                <Th textAlign="center">Brand</Th>
                <Th textAlign="center">Price</Th>
                <Th textAlign="center">Quantity</Th>
                <Th textAlign="center">Total Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {order?.orderDetails?.map((orderProduct) => (
                <Tr key={orderProduct.productID} _hover={{ cursor: "pointer" }}>
                  <Td textAlign="center">{orderProduct.productID}</Td>
                  <Td textAlign="center">{orderProduct.productName}</Td>
                  <Td textAlign="center">{orderProduct.model}</Td>
                  <Td textAlign="center">{orderProduct.brand}</Td>
                  <Td textAlign="center">{orderProduct.price}</Td>
                  <Td textAlign="center">{orderProduct.quantity}</Td>
                  <Td textAlign="center">
                    {formatPrice(parseFloat(orderProduct.totalPrice).toFixed(2))}
                  </Td>
                </Tr>
              )) ?? null}
            </Tbody>
          </Table>
        </Box>
      </ModalComponent>
    </PageContainer>
  );
};

export default Transaction;
