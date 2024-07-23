"use client";

import ProductCard from "../inventory/product_card";
import { productJsonData } from "../inventory/data";
import { Box, Flex, Heading } from "@chakra-ui/react";

const Products = () => {
  function handleAddToCard() {}

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" pl={2} pr={2}>
        <Heading size="md">Products</Heading>
        <Box w="12rem">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 px-4 border rounded-3xl shadow-sm"
          />
        </Box>
      </Flex>
      <main>
        <div className="flex flex-wrap p-5">
          {productJsonData.map((product, i) => (
            <ProductCard key={i} {...product} isInventoryDisplay={false} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Products;
