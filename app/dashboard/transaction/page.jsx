"use client";

import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
} from "@chakra-ui/react";
import orderData from "@data/transaction_data";

const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(orderData.length / itemsPerPage);

  return (
    <ChakraProvider>
      <Box w="inherit" h="80vh" bg="white" rounded={15} boxShadow="md" p={4}>
        <Text fontSize="2xl" mb={4}>
          Order Transactions
        </Text>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Product Type</Th>
              <Th>Product Name</Th>
              <Th>Customer</Th>
              <Th>Order Date</Th>
              <Th>Status</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((order) => (
              <Tr key={order.orderId}>
                <Td>{order.orderId}</Td>
                <Td>{order.productType}</Td>
                <Td>{order.productName}</Td>
                <Td>{order.customer}</Td>
                <Td>{order.orderDate}</Td>
                <Td>{order.status}</Td>
                <Td>{order.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box display="flex" justifyContent="end" gap={10} mt={4}>
          <Button
            size="md"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
            colorScheme="orange"
          >
            Previous
          </Button>
          <Text fontSize={18} fontWeight={600}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            size="md"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
            colorScheme="orange"
          >
            Next
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Transaction;
