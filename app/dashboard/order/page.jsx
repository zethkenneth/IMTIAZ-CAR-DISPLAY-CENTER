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
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import ModalComponent from "@components/ModalComponent";
import useOrderHooks from "@hooks/orderhooks";
import axios from "axios";
import PageContainer from "@components/PageContainer";
import { DeleteIcon } from "@chakra-ui/icons";

const Order = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { orders, getOrders } = useOrderHooks();
  const [order, setOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const toast = useToast();

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  const handleCancelOrder = async (orderID) => {
    try {
      const response = await axios.put(`/api/imtiaz/orders/${orderID}/cancel`);
      if (response.data.status === 200) {
        getOrders(null, (status, feedback) => {
          if (status === 200) {
            toast({
              title: "Success",
              description: "Order cancelled successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel order",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  function handleSelectOrder(order) {
    setOrder(order);
    onOpen();
  }

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (orders.length === 0) {
      getOrders(cancelToken.token, (status, feedback) => {
        if(!(status >= 200 && status < 30)){
          return console.log(feedback);
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
          Order List
        </Text>
        
        <Box overflowY="auto" flex="1">
          <Table variant="striped" colorScheme="orange">
            <Thead position="sticky" top={0} bg="white" zIndex={1}>
              <Tr>
                <Th textAlign="center">Order ID</Th>
                <Th textAlign="center">Payment Code</Th>
                <Th textAlign="center">Payment Status</Th>
                <Th textAlign="center">Customer</Th>
                <Th textAlign="center">Order Date</Th>
                <Th textAlign="center">Status</Th>
                <Th textAlign="center">Total Amount</Th>
                <Th textAlign="center">Actions</Th>
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
                  <Td textAlign="center">
                    <Tooltip label="Cancel Order" hasArrow>
                      <IconButton
                        icon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        isDisabled={order.paymentStatus === "Completed" || order.paymentStatus === "Cancelled"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelOrder(order.orderID);
                        }}
                        aria-label="Cancel Order"
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Pagination controls */}
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
        <Flex gap={5}>
          <Flex gap={2} alignItems="center">
            <Text fontSize={13}>ORDER Code</Text>
            <Heading size="sm">{order?.orderCode ?? "NONE"}</Heading>
          </Flex>
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
    </PageContainer>
  );
};

export default Order;
