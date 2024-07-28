"use client";

import { productJsonData } from "@app/dashboard/inventory/data";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import "../../styles/hide_scroll_bar.css";
import ProductImage from "@components/ProductImage";
import ButtonComponent from "@components/button";
import { useRouter } from "next/navigation";

const ProductLandingPage = () => {
  const router = useRouter();
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  return (
    <Flex
      w="100%"
      h="inherit"
      bg="rgba(0,0,0,0.05)"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      p={2}
    >
      <Heading color="gray">Our Products</Heading>
      <Text>We sell brand new cars, second hand and auto parts.</Text>
      <Box w="inherit" mt={10}>
        <Flex
          overflow="scroll"
          h="inherit"
          gap={10}
          className="scrollbar-hide"
          pt={5}
          pb={5}
        >
          {productJsonData.slice(0, 5).map((value, index) => {
            return (
              <Box
                key={index}
                bg="white"
                h="50vh"
                boxShadow="lg"
                p={5}
                rounded={10}
              >
                <Flex
                  flexDir="column"
                  w="25rem"
                  h="inherit"
                  pb={10}
                  justifyContent="space-between"
                  overflow="hidden"
                >
                  <Box>
                    <ProductImage imageUrl={value.imageUrl} />
                    <Heading mt={2} size="lg">
                      {value.name}
                    </Heading>
                    <Text>{`${value.year} ${value.model}`}</Text>
                    <Text mt={5}>{value.description2.engine_options}</Text>
                  </Box>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize={18}>
                      <strong>{formatPrice(value.price)}</strong>
                    </Text>
                    <ButtonComponent
                      w="7rem"
                      label="Buy now!"
                      onClick={() => router.push("/login")}
                    />
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductLandingPage;