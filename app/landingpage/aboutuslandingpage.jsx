"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import "../../styles/hide_scroll_bar.css";

const AboutUsLandingPage = () => {
  return (
    <Box
      w="full"
      minH="100vh"
      bgImage="url('/assets/cars/about_us_wallpaper.jpg')"
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
    >
      <Flex
        w="full"
        minH="50vh"
        bg="rgba(0,0,0,0.5)"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        p={4}
      >
        <Heading
          textAlign="center"
          className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
          mb={4}
        >
          About Us
        </Heading>
        <Box w={{ base: "90%", md: "60%" }} color="white" textAlign="center">
          <Text>
            IMTIAZ is your one-stop solution for all your automotive needs. We
            are a dynamic platform dedicated to streamlining the buying and
            selling of new and used cars, as well as auto parts.
          </Text>
          <Text mt={5}>
            Our mission is to provide a seamless experience for both buyers and
            sellers by offering a comprehensive inventory management system,
            robust sales reporting, and secure online payment options.
          </Text>
          <Text mt={5}>
            We believe in the power of technology to transform the automotive
            industry. That's why we have integrated a user-friendly chatbot to
            assist you with inquiries and provide round-the-clock support.
          </Text>
          <Text mt={5}>
            Choose IMTIAZ for a smarter, faster, and more efficient way to
            manage your automotive inventory.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutUsLandingPage;
