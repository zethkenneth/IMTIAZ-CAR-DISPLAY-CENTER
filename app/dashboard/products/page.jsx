"use client";

import ProductCard from "../inventory/product_card";
import { Box, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react";
import useInventorHooks from "@hooks/inventoryhooks";
import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "@components/PageContainer";
import { SearchIcon } from '@chakra-ui/icons';
import ProductCardAnimation from "./component/ProductCardAnimation";

const Products = () => {
  const { products, getInventory } = useInventorHooks();
  const [search, setSearch] = useState("");
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("All Brands");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All Categories");

  const filter = products.filter((product) => {
    const matchesSearch = search === "" || product.productName.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrandFilter === "All Brands" || product.brand?.toLowerCase() === selectedBrandFilter.toLowerCase();
    const matchesCategory = selectedCategoryFilter === "All Categories" || product.category?.toLowerCase() === selectedCategoryFilter.toLowerCase();
    return matchesSearch && matchesBrand && matchesCategory;
  });

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

  const brands = ["All Brands", ...new Set(
    products
      ?.map(product => product.brand?.trim()) 
      .filter(brand => brand)                      
  )];

  const categories = ["All Categories", ...new Set(
    products
      ?.map(product => product.category?.trim())
      .filter(category => category)
  )];

  return (
    <PageContainer>
      <>
        <Flex justifyContent="space-between" alignItems="center" pl={2} pr={2}>
          <Heading size="lg" color="orange">
            Products
          </Heading>
          <div className="flex gap-4">
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
            <Select
              value={selectedBrandFilter}
              onChange={(e) => setSelectedBrandFilter(e.target.value)}
              w="200px"
            >
              {brands?.map((brand) => (
                <option key={brand} value={`${brand}`}>
                  {brand}
                </option>
              ))}
            </Select>
            <Select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              w="200px"
            >
              {categories?.map((category) => (
                <option key={category} value={`${category}`}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </Flex>
        <main>
          <Box overflowY="auto" maxHeight="80vh" p={5}>
            {" "}
            {/* Set maxHeight for scrolling */}
            <div className="flex flex-wrap gap-5">
              {products.length === 0 ? (
                <LoadingAnimationProductList />
              ) : (
                <ProductList />
              )}
            </div>
          </Box>
        </main>
      </>
    </PageContainer>
  );
};

export default Products;
