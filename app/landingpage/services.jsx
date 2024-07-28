"use client";

import { Box, Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import "../../styles/hide_scroll_bar.css";
import { useRouter } from "next/navigation";
import services_data from "@data/services_data";

const ServicesLandingPage = () => {
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
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      p={2}
    >
      <Heading color="gray">Our Products</Heading>
      <Text>We sell brand new cars, second hand and auto parts.</Text>
      <Box w="inherit" mt={10}>
        <Wrap h="inherit" spacing={10} justifyContent="center" pt={5} pb={5}>
          {services_data.slice(0, 5).map((value, index) => {
            return (
              <WrapItem key={index}>
                <Box bg="white" h="14rem" boxShadow="lg" p={5} rounded={10}>
                  <Flex
                    flexDir="column"
                    w="25rem"
                    pb={10}
                    gap={5}
                    overflow="hidden"
                  >
                    <Heading size="md">{value.title}</Heading>
                    <Text>{value.description}</Text>
                  </Flex>
                </Box>
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>
    </Flex>
  );
};

export default ServicesLandingPage;
