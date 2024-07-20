"use client";

import { useState } from "react";
import { Box, Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import ButtonComponent from "@components/button";
import { PlusIcon } from "@heroicons/react/24/outline";

const InventoryNavBar = ({ openModal }) => {
  const [activeButton, setActiveButton] = useState("Brand New");

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
      borderBottom="1px solid gray"
      bg="gray.100"
    >
      <Heading size="md">Inventory Management</Heading>
      <div className="flex justify-between items-center bg-gray-100 p-2">
        {/* Search Bar */}
        <div className="flex-1 flex items-center px-4 bg-orange">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 px-4 border rounded-3xl shadow-sm"
          />
        </div>

        {/* Category Buttons */}

        <ButtonGroup spacing="2">
          {["Brand New", "Second Hand", "Parts", "Low Stock"].map(
            (label, index) => (
              <Button
                key={index}
                px="4"
                py="2"
                bg={activeButton === label ? "orange" : "gray.500"}
                color="white"
                rounded="3xl"
                _hover={{ bg: "orange.600" }}
                onClick={() => handleClick(label)}
              >
                {label}
              </Button>
            )
          )}
        </ButtonGroup>
      </div>
      <Box w="10rem">
        <ButtonComponent
          icon={<PlusIcon />}
          label="New Product"
          onClick={handleOpenAddProduct}
        />
      </Box>
    </Flex>
  );
};

export default InventoryNavBar;
