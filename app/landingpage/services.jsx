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
      <Heading className="orange_gradient text-center">Our Services</Heading>
      <Text>Discover a vast selection of new and pre-owned vehicles, as well as a comprehensive range of auto parts to cater to all your automotive needs.</Text>
      <Box w="inherit" mt={10}>
        <Wrap h="inherit" spacing={10} justifyContent="center" pt={5} pb={5}>
          {services_data.slice(0, 5).map((value, index) => {
            return (
              <WrapItem key={index} color="black.alpha100" className="group">
                <Box bg="white" h="14rem" boxShadow="lg" p={5} rounded={10}>
                  <Flex
                    flexDir="column"
                    w="25rem"
                    pb={10}
                    gap={5}
                    overflow="hidden"
                  >
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Heading
                        size="md"
                        textAlign="center"
                        className="transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent">{value.title}</Heading>
                      <span className="transition-colors duration-300 ease-in-out group-hover:text-orange-600">
                        {value.icon}
                      </span>
                    </Flex>
                    <Text fontSize={15}>{value.description}</Text>
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
