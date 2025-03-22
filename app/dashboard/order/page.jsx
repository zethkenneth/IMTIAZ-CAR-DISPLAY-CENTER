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
  Divider,
  Badge,
  SimpleGrid,
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "NONE";
  };

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
        <Text fontSize="2xl" mb={4}>Order List</Text>
        
        {/* Main Orders Table */}
        <Box overflowY="auto" flex="1">
          <Table variant="striped" colorScheme="orange">
            <Thead position="sticky" top={0} bg="white" zIndex={1}>
              <Tr>
                <Th textAlign="center">Order ID</Th>
                <Th textAlign="center">Payment Code</Th>
                <Th textAlign="center">Customer</Th>
                <Th textAlign="center">Order Date</Th>
                <Th textAlign="center">Total Amount</Th>
                <Th textAlign="center">Status</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((order) => (
                <Tr
                  key={order.orderID}
                  _hover={{ cursor: "pointer", bg: "gray.50" }}
                  onClick={() => handleSelectOrder(order)}
                >
                  <Td textAlign="center">{order.orderID}</Td>
                  <Td textAlign="center">{order.paymentCode}</Td>
                  <Td textAlign="center">{order.customerName || 'N/A'}</Td>
                  <Td textAlign="center">{formatDate(order.orderDate)}</Td>
                  <Td textAlign="center">{formatPrice(order.totalAmount)}</Td>
                  <Td textAlign="center">
                    <Badge colorScheme={getStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
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

        {/* Pagination */}
        <Flex justifyContent="end" alignItems="center" gap={10} mt={4} p={2}>
          <Button
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
            colorScheme="orange"
          >
            Previous
          </Button>
          <Text fontSize={14} fontWeight={600}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            isDisabled={currentPage === totalPages}
            colorScheme="orange"
          >
            Next
          </Button>
        </Flex>
      </Box>

      {/* Order Details Modal */}
      <ModalComponent
        title="Order Details"
        isOpen={isOpen}
        onClose={onClose}
        withCloseButton={true}
        size="5xl"
      >
        <Box>
          {/* Order Information */}
          <Box mb={6} p={4} bg="gray.50" rounded="md">
            <Heading size="sm" mb={4}>Order Information</Heading>
            <SimpleGrid columns={2} spacing={4}>
              <Flex direction="column" gap={2}>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Order ID:</Text>
                  <Text>{order?.orderID}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Payment Code:</Text>
                  <Text>{order?.paymentCode}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Order Date:</Text>
                  <Text>{formatDate(order?.orderDate)}</Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap={2}>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Customer Name:</Text>
                  <Text>{order?.customerName || 'N/A'}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Status:</Text>
                  <Badge colorScheme={getStatusColor(order?.paymentStatus)}>
                    {order?.paymentStatus}
                  </Badge>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Total Amount:</Text>
                  <Text>{formatPrice(order?.totalAmount)}</Text>
                </Flex>
              </Flex>
            </SimpleGrid>
          </Box>

          <Divider my={4} />

          {/* Order Items */}
          <Heading size="sm" mb={4}>Order Items</Heading>
          <Table variant="simple" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>Product Name</Th>
                <Th>Model</Th>
                <Th>Brand</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Quantity</Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {order?.orderDetails?.map((item) => (
                <Tr key={item.productID}>
                  <Td>{item.productName}</Td>
                  <Td>{item.model}</Td>
                  <Td>{item.brand}</Td>
                  <Td isNumeric>{formatPrice(item.price)}</Td>
                  <Td isNumeric>{item.quantity}</Td>
                  <Td isNumeric>{formatPrice(item.totalPrice)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </ModalComponent>
    </PageContainer>
  );
};

export default Order;
