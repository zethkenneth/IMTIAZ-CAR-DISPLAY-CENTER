"use client";

import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import "../../styles/hide_scroll_bar.css";

const AboutUsLandingPage = () => {
  return (
    <Box w="inherit" h="inherit" >
      <Box
        position="relative"
        w="100%"
        h="100%"
        backgroundImage="url('/assets/cars/about_us_wallpaper.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Flex
          w="100%"
          h="50vh"
          bg="rgba(0,0,0,0.05)"
          justifyContent="center"
          flexDir="column"
          alignItems="center"
          p={2}
        >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="black"
          opacity="0.5"
        />
          <Flex
            w="100%"
            h="50vh"
            justifyContent="center"
            flexDir="column"
            alignItems="center"
            zIndex={99}
            mt='5rem'
          > 
            <Heading
              textAlign="center"
              className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">About Us</Heading>
            <Flex w="inherit" justifyContent="center" mt={10}>
              <Box
                overflow="scroll"
                w="60%"
                h="inherit"
                gap={10}
                className="scrollbar-hide"
                pt={5}
                pb={5}
                color='white'
              >
                <Text textAlign="center">
                  {`IMTIAZ is your one-stop solution for all your automotive needs. We are a dynamic platform dedicated to streamlining the buying and selling of new and used cars, as well as auto parts.`}
                </Text>
                <Text mt={5} textAlign="center">
                  {`Our mission is to provide a seamless experience for both buyers and sellers by offering a comprehensive inventory management system, robust sales reporting, and secure online payment options. With IMTIAZ, you can efficiently manage your automotive business, track sales performance, and reach a wider audience.`}
                </Text>
                <Text mt={5} textAlign="center">
                  {`We believe in the power of technology to transform the automotive industry. That's why we have integrated a user-friendly chatbot to assist you with inquiries and provide round-the-clock support.`}
                </Text>
                <Text mt={5} textAlign="center">
                  {`Choose IMTIAZ for a smarter, faster, and more efficient way to manage your automotive inventory..`}
                </Text>
                <Flex justifyContent="end">
                  <Box>
                    <Text fontSize={13}>Contact us imtiaz@gmail.com</Text>
                    <Text fontSize={13}>Mobile: 09123512324</Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default AboutUsLandingPage;
