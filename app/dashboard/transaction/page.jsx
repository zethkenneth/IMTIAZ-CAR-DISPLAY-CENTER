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
  Heading,
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
      <>
        <Box w="inherit" h="80vh" bg="white" rounded={15} boxShadow="md" p={4}>
          <Text fontSize="2xl" mb={4}>
            Transactions
          </Text>
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>Transaction ID</Th>
                <Th>Payment Code</Th>
                <Th>Payment Status</Th>
                <Th>Customer</Th>
                <Th>Order Date</Th>
                <Th>Status</Th>
                <Th>Total Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((order) => (
                <Tr
                  key={order.orderID}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleSelectOrder(order)}
                >
                  <Td>{order.orderID}</Td>
                  <Td>{order.paymentCode}</Td>
                  <Td>{order.paymentStatus}</Td>
                  <Td>{order.customerName}</Td>
                  <Td>
                    {order?.orderDate
                      ? new Date(order.orderDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "NONE"}
                  </Td>
                  <Td>{order.status}</Td>
                  <Td>
                    {formatPrice(parseFloat(order.totalAmount).toFixed(2))}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justifyContent="end" alignItems="center" gap={10} mt={4}>
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
                <Th>Product ID</Th>
                <Th>Product Name</Th>
                <Th>Model</Th>
                <Th>Brand</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Total Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {order?.orderDetails?.map((orderProduct) => (
                <Tr key={orderProduct.productID} _hover={{ cursor: "pointer" }}>
                  <Td>{orderProduct.productID}</Td>
                  <Td>{orderProduct.productName}</Td>
                  <Td>{orderProduct.model}</Td>
                  <Td>{orderProduct.brand}</Td>
                  <Td>{orderProduct.price}</Td>
                  <Td>{orderProduct.quantity}</Td>
                  <Td>
                    {formatPrice(
                      parseFloat(orderProduct.totalPrice).toFixed(2)
                    )}
                  </Td>
                </Tr>
              )) ?? null}
            </Tbody>
          </Table>
        </ModalComponent>
      </>
    </PageContainer>
  );
};

export default Transaction;
