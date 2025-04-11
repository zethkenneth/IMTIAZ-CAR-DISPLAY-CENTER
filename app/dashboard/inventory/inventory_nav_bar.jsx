"use client";

import { useState } from "react";
import { Box, Button, ButtonGroup, Flex, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, Select, Text, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";

const InventoryNavBar = ({
  search,
  setSearch,
  activeButton,
  setActiveButton,
  openModal,
  selectedBrandFilter,
  setSelectedBrandFilter,
  brands,
  products
}) => {
  const toast = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleClick = (button) => {
    setActiveButton(button);
  };

  function handleOpenAddProduct() {
    openModal();
  }

  const exportToPDF = async () => {
    try {
      setIsExporting(true);
      const response = await axios.post('/api/imtiaz/inventory/export', {
        data: products,
        exportType: 'pdf'
      }, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Create blob from array buffer
      const blob = new Blob([response.data], { type: 'application/pdf' });
      
      // Open PDF in new tab
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Error",
        description: "Failed to export inventory to PDF",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Box bg="gray.100" p={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", md: "center" }}
        gap={4}
      >
        <Heading size="lg" color="orange">
          Inventory Management
        </Heading>

        <Wrap spacing={4} align="center" justify={{ base: "flex-start", md: "flex-end" }}>
          <WrapItem>
            <Flex
              bg="white"
              borderRadius={50}
              overflow="hidden"
              w={{ base: "100%", md: "15rem" }}
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
          </WrapItem>

          <WrapItem>
            <ButtonGroup spacing="2" size="sm">
              {["Brand New", "Second Hand", "Auto Part", "Low Stock"].map(
                (label, index) => (
                  <Button
                    key={index}
                    px="4"
                    py="1"
                    bg={activeButton === label ? "orange" : "gray.500"}
                    color="white"
                    rounded="3xl"
                    _hover={{ bg: "orange.600" }}
                    onClick={() => handleClick(label)}
                  >
                    <Text fontSize={12}>{label}</Text>
                  </Button>
                )
              )}
            </ButtonGroup>
          </WrapItem>

          <WrapItem>
            <Select
              value={selectedBrandFilter}
              onChange={(e) => setSelectedBrandFilter(e.target.value)}
              w={{ base: "100%", md: "200px" }}
              size="sm"
            >
              {brands?.map((brand) => (
                <option key={brand} value={`${brand}`}>{brand}</option>
              ))}
            </Select>
          </WrapItem>

          <WrapItem>
            <Button
              colorScheme="orange"
              variant="solid"
              size="sm"
              onClick={handleOpenAddProduct}
            >
              <HStack spacing={2} align="center">
                <AddIcon />
                <Text>New Product</Text>
              </HStack>
            </Button>
          </WrapItem>

          <WrapItem>
            <Button
              leftIcon={<FaFilePdf />}
              colorScheme="red"
              variant="solid"
              size="sm"
              onClick={exportToPDF}
              isLoading={isExporting}
              loadingText="Exporting..."
            >
              Export PDF
            </Button>
          </WrapItem>
        </Wrap>
      </Flex>
    </Box>
  );
};

export default InventoryNavBar;
