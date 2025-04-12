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
  useDisclosure,
  Heading,
  SimpleGrid,
  Flex,
  Badge,
  Divider,
  Center,
  Spinner,
  Button,
  useToast,
} from "@chakra-ui/react";
import ModalComponent from "@components/ModalComponent";
import axios from "axios";
import PageContainer from "@components/PageContainer";

const Customer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const toast = useToast();

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  const fetchCustomers = () => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    
    axios.get('/api/imtiaz/customers', { cancelToken: cancelToken.token })
      .then(response => {
        if (response.data.status === 200) {
          setCustomers(response.data.data);
        } else {
          throw new Error(response.data.error || 'Failed to fetch customers');
        }
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          console.error('Error fetching customers:', error);
          toast({
            title: "Error",
            description: "Failed to fetch customers",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    
    return cancelToken;
  };

  useEffect(() => {
    let cancelToken = fetchCustomers();

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        cancelToken.cancel();
        cancelToken = fetchCustomers();
      }
    };

    // Handle window focus
    const handleFocus = () => {
      cancelToken.cancel();
      cancelToken = fetchCustomers();
    };

    // Set up periodic refresh (every 5 minutes)
    const refreshInterval = setInterval(() => {
      cancelToken.cancel();
      cancelToken = fetchCustomers();
    }, 300000);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      cancelToken.cancel();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      clearInterval(refreshInterval);
    };
  }, []);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
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
        <Text fontSize="2xl" mb={4}>
          Customers
        </Text>
        
        <Box overflowX="auto">
          {isLoading ? (
            <Center p={8}>
              <Spinner size="xl" color="blue.500" />
            </Center>
          ) : (
            <Table variant="striped" colorScheme="orange">
              <Thead position="sticky" top={0} bg="white" zIndex={1}>
                <Tr>
                  <Th textAlign="center">First Name</Th>
                  <Th textAlign="center">Last Name</Th>
                  <Th textAlign="center">Email</Th>
                  <Th textAlign="center">Phone No.</Th>
                  <Th textAlign="center">Total Orders</Th>
                  <Th textAlign="center">Total Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentItems.map((customer) => (
                  <Tr
                    key={customer.customerID}
                    _hover={{ cursor: "pointer", bg: "gray.50" }}
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    <Td textAlign="center">{customer.firstName}</Td>
                    <Td textAlign="center">{customer.lastName}</Td>
                    <Td textAlign="center">{customer.email}</Td>
                    <Td textAlign="center">{customer.phone}</Td>
                    <Td textAlign="center">{customer.totalOrders}</Td>
                    <Td textAlign="center">{formatPrice(customer.totalAmount)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
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

      {/* Customer Details Modal */}
      <ModalComponent
        title="Customer Details"
        isOpen={isOpen}
        onClose={onClose}
        withCloseButton={true}
        size="5xl"
      >
        {selectedCustomer && (
          <Box overflowY="auto" maxH="60vh">
            {/* Customer Information */}
            <Box mb={6} p={4} bg="gray.50" rounded="md">
              <Heading size="sm" mb={4}>Customer Information</Heading>
              <SimpleGrid columns={2} spacing={4}>
                <Flex direction="column" gap={2}>
                  <Flex justify="space-between">
                    <Text fontWeight="bold">First Name:</Text>
                    <Text>{selectedCustomer.firstName}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Last Name:</Text>
                    <Text>{selectedCustomer.lastName}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Email:</Text>
                    <Text>{selectedCustomer.email}</Text>
                  </Flex>
                </Flex>
                <Flex direction="column" gap={2}>
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Phone:</Text>
                    <Text>{selectedCustomer.phone}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Total Orders:</Text>
                    <Text>{selectedCustomer.totalOrders}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Total Amount:</Text>
                    <Text>{formatPrice(selectedCustomer.totalAmount)}</Text>
                  </Flex>
                </Flex>
              </SimpleGrid>
            </Box>

            <Divider my={4} />

            {/* Order History */}
            <Heading size="sm" mb={4}>Order History</Heading>
            <Table variant="striped" colorScheme="orange">
              <Thead>
                <Tr>
                  <Th textAlign="center">Order ID</Th>
                  <Th textAlign="center">Date</Th>
                  <Th textAlign="center">Items</Th>
                  <Th textAlign="center">Payment Status</Th>
                  <Th textAlign="center">Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedCustomer.orders?.map((order) => (
                  <Tr key={order.orderID}>
                    <Td textAlign="center">{order.orderID}</Td>
                    <Td textAlign="center">
                      {new Date(order.orderDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Td>
                    <Td textAlign="center">{order?.items?.join(", ")}</Td>
                    <Td textAlign="center">
                      <Badge colorScheme={order.paymentStatus === "Completed" ? "green" : "yellow"}>
                        {order.paymentStatus}
                      </Badge>
                    </Td>
                    <Td textAlign="center">{formatPrice(order.totalAmount)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </ModalComponent>
    </PageContainer>
  );
};

export default Customer; 