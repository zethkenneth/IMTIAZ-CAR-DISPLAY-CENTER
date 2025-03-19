"use client";

import ProductCard from "../inventory/product_card";
import { Box, Flex, Heading, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import useInventorHooks from "@hooks/inventoryhooks";
import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "@components/PageContainer";
import { SearchIcon } from '@chakra-ui/icons';
import ProductCardAnimation from "./component/ProductCardAnimation";

const Products = () => {
  const { products, getInventory } = useInventorHooks();
  const [search, setSearch] = useState("");

  const filter = search === ""? products: products.filter((product) => product.productName.toLowerCase().includes(search.toLowerCase()));

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
  }, []);


  const LoadingAnimationProductList = () => {
    const start = 1;
    const end = 6;

    return (
      Array.from({ length: end - start + 1 }, (_, i) => i + start).map((val) => <ProductCardAnimation key={val} /> )
    )
  }

  const ProductList = () => {
    return     filter?.map((product, i) => (
      <ProductCard
        key={i}
        name={product.productName}
        {...product}
        product={product}
        description2={product?.description2?.overview}
        isInventoryDisplay={false}
      />
    )) ?? [];
  }

  return (
    <PageContainer>
      <>
        <Flex justifyContent="space-between" alignItems="center" pl={2} pr={2}>
          <Heading size="lg" color='orange'>Products</Heading>
          <Flex justifyContent='start' gap={2} alignItems='center' w="15rem" bg='white' p={'10 2'} borderRadius={50} overflow='hidden'>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={SearchIcon} color="orange.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search..."
                border='none'
                focusBorderColor="white"
                _hover={{ borderColor: 'gray.400' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </InputGroup>
          </Flex>
        </Flex>
        <main>
          <Box overflowY="auto" maxHeight="80vh" p={5}> {/* Set maxHeight for scrolling */}
            <div className="flex flex-wrap gap-5">
              {
                products.length === 0 ? <LoadingAnimationProductList /> : <ProductList />
              }
            </div>
          </Box>
        </main>
      </>
    </PageContainer>
  );
};

export default Products;
