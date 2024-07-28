"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import "../../styles/hide_scroll_bar.css";

const AboutUsLandingPage = () => {
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
      <Heading color="gray">About Us</Heading>
      <Flex w="inherit" justifyContent="center" mt={10}>
        <Box
          overflow="scroll"
          w="60%"
          h="inherit"
          gap={10}
          className="scrollbar-hide"
          pt={5}
          pb={5}
        >
          <Text textAlign="center">
            {`
                Welcome to IMTIAZ We are dedicated to providing you with the best
                solutions for managing and tracking your automotive needs. Our web app
                is designed to offer a comprehensive suite of tools to assist with
                various aspects of automotive sales, maintenance, and inventory
                management.`}
          </Text>
          <Text mt={5} textAlign="center">
            {`
                Our mission is to streamline automotive management and enhance the user
                experience through innovative technology and dedicated support. We aim
                to provide a user-friendly platform that meets all your automotive needs
                in one place.`}
          </Text>
          <Flex justifyContent="end" mt={10}>
            <Box>
              <Text fontSize={13}>Contact us imtiaz@gmail.com</Text>
              <Text fontSize={13}>Mobile: 09123512324</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AboutUsLandingPage;
