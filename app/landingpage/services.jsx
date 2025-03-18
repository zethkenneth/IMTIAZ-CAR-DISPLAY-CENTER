"use client";

import { Box, Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import "../../styles/hide_scroll_bar.css";
import services_data from "@data/services_data";

const ServicesLandingPage = () => {

  return (
    <Flex
      w="full"
      minH="100vh"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      p={4}
    >
      <Heading className="orange_gradient text-center" mb={4}>
        Our Services
      </Heading>
      <Text textAlign="center" maxW="600px" mb={8}>
        Discover a vast selection of new and pre-owned vehicles, as well as a comprehensive range of auto parts to cater to all your automotive needs.
      </Text>
      <Box w="full" mt={10}>
        <Wrap spacing={6} justify="center" pt={5} pb={5}>
          {services_data.map((value, index) => (
            <WrapItem key={index} w={{ base: "100%", sm: "45%", md: "30%" }} p={2}>
              <Box
                bg="white"
                boxShadow="lg"
                p={5}
                rounded={10}
                className="group"
                _hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
                transition="all 0.3s ease-in-out"
                h="200px"
              >
                <Flex flexDir="column" h="full" justifyContent="space-between">
                  <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Heading
                      size="md"
                      textAlign="center"
                      className="transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent"
                    >
                      {value.title}
                    </Heading>
                    <span className="transition-colors duration-300 ease-in-out group-hover:text-orange-600">
                      {value.icon}
                    </span>
                  </Flex>
                  <Text fontSize={15} mb={4} noOfLines={3}>
                    {value.description}
                  </Text>
                </Flex>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Flex>
  );
};

export default ServicesLandingPage;
