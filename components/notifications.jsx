"use client";

import React from "react";
import {
  Box,
  Button,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  Badge,
  VStack,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "Order Paid",
    message: "Order #1234 is paid with amount $250.",
    type: "order",
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message: "Product XYZ is low on stock.",
    type: "stock",
  },
  {
    id: 3,
    title: "Order Pending",
    message: "Order #5678 is pending.",
    type: "order",
  },
  {
    id: 4,
    title: "New User Registration",
    message: "New user registered.",
    type: "user",
  },
  {
    id: 5,
    title: "Scheduled Maintenance",
    message: "Scheduled maintenance on 5th August.",
    type: "maintenance",
  },
  {
    id: 6,
    title: "Order Shipped",
    message: "Order #9101 has been shipped.",
    type: "order",
  },
  {
    id: 7,
    title: "Product Restocked",
    message: "Product ABC has been restocked.",
    type: "stock",
  },
  {
    id: 8,
    title: "Order Canceled",
    message: "Order #1213 has been canceled.",
    type: "order",
  },
  {
    id: 9,
    title: "New Comment",
    message: "A new comment has been added to your post.",
    type: "user",
  },
  {
    id: 10,
    title: "System Update",
    message: "System update scheduled for 10th August.",
    type: "maintenance",
  },
];

const Notification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getBadgeColor = (type) => {
    switch (type) {
      case "order":
        return "green";
      case "stock":
        return "red";
      case "user":
        return "blue";
      case "maintenance":
        return "yellow";
      default:
        return "gray";
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Button
          rounded="full"
          colorScheme="gray"
          variant="ghost"
          _hover={{ bg: "transparent" }}
          _focus={{
            boxShadow: "outline",
            ring: 2,
            ringOffset: 2,
            ringColor: "gray.500",
          }}
        >
          <Icon as={FaBell} h={6} w={6} />
        </Button>
      </PopoverTrigger>
      <PopoverContent maxHeight="20rem" overflow="hidden">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverBody overflow="scroll">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Box
                key={notification.id}
                p={2}
                borderBottom="1px"
                borderColor="gray.200"
              >
                <Flex justifyContent="space-between">
                  <Heading size="sm">{notification.title}</Heading>
                  <Badge colorScheme={getBadgeColor(notification.type)} mr={2}>
                    {notification.type}
                  </Badge>
                </Flex>
                <Text>{notification.message}</Text>
              </Box>
            ))
          ) : (
            <Box p={2}>No new notifications</Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
