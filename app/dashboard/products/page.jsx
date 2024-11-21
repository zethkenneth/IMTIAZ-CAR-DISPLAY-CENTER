"use client";

import ProductCard from "../inventory/product_card";
import { Box, Flex, Heading } from "@chakra-ui/react";
import useInventorHooks from "@hooks/inventoryhooks";
import { useEffect } from "react";
import axios from "axios";
import PageContainer from "@components/PageContainer";

const Products = () => {
  const { products, getInventory } = useInventorHooks();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (products?.length === 0) {
      getInventory(cancelToken.token, (status, feedback) => {
        if (!(status >= 200 && status < 300)) {
          console.log(feedback);
        }
      });
    }

    return () => cancelToken.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
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
            {products?.map((product, i) => (
              <ProductCard
                key={i}
                name={product.productName}
                {...product}
                product={product}
                description2={JSON.parse(product.description2)}
                isInventoryDisplay={false}
              />
            )) ?? []}
          </div>
        </main>
      </>
    </PageContainer>
  );
};

export default Products;
