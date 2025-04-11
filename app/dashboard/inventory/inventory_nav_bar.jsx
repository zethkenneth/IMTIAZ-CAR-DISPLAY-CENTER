"use client";

import { useState } from "react";
import { Box, Button, ButtonGroup, Flex, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, Select, Text } from "@chakra-ui/react";
import { SearchIcon, AddIcon } from '@chakra-ui/icons';

const InventoryNavBar = ({
  search,
  setSearch,
  activeButton,
  setActiveButton,
  openModal,
  selectedBrandFilter,
  setSelectedBrandFilter,
  brands
}) => {

  const handleClick = (button) => {
    setActiveButton(button);
  };

  function handleOpenAddProduct() {
    openModal();
  }

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      pl={2}
      pr={5}
      bg="gray.100"
    >
      <Heading size="lg" color="orange">
        Inventory Management
      </Heading>
      <Flex gap={5} alignItems="center">
        <Flex
          justifyContent="start"
          gap={2}
          alignItems="center"
          w="15rem"
          bg="white"
          p={"10 2"}
          borderRadius={50}
          overflow="hidden"
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchIcon} color="orange.500" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search..."
              border="none"
              focusBorderColor="white"
              _hover={{ borderColor: "gray.400" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <ButtonGroup spacing="2">
          {["Brand New", "Second Hand", "Auto Part", "Low Stock"].map(
            (label, index) => (
              <Button
                key={index}
                px="4"
                py="1"
                bg={activeButton === label ? "orange" : "gray.500"}
                color="white"
                rounded="3xl"
                size="sm"
                _hover={{ bg: "orange.600" }}
                onClick={() => handleClick(label)}
              >
                <Text fontSize={12}>{label}</Text>
              </Button>
            )
          )}
        </ButtonGroup>
        <Select
          value={selectedBrandFilter}
          onChange={(e) => setSelectedBrandFilter(e.target.value)}
          w="200px"
        >
          {brands?.map((brand) => (
            <option key={brand} value={`${brand}`}>{brand}</option>
          ))}
        </Select>
        <Box w="10rem">
          <Button
            colorScheme="orange" // Use colorScheme instead of colorPalette
            variant="solid"
            size="sm"
            bg="orange.400"
            _hover={{ bg: "orange.500" }} // Add a hover effect with a different shade
            onClick={handleOpenAddProduct}
          >
            <HStack spacing={2} align="center">
              <AddIcon />
              <Text>New Product</Text>
            </HStack>
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default InventoryNavBar;
