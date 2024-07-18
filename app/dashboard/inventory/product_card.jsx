import { Avatar, Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import ButtonComponent from "@components/button";
import React from "react";

const ProductCard = ({ image, name, price }) => {
  function handleAddToCard(stopLoading) {
    setTimeout(() => stopLoading(), 500);
  }

  return (
    <Flex
      w="15rem"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="md"
      overflow="hidden"
    >
      <Box w="100%" h="100%" bg="gray.100" p={5}>
        <Flex justifyContent="center" w="100%" h="auto">
          <Avatar src={image} name={name} size="2xl" />
        </Flex>
      </Box>
      <Flex
        gap={5}
        w="100%"
        h="7rem"
        flexDir="column"
        textAlign="center"
        justifyContent="space-between"
        p={5}
      >
        <Flex flexDir="column" alignItems="start">
          <Heading size="sm">{name}</Heading>
          <Text>
            <strong>{price.toFixed(2)}</strong>
          </Text>
        </Flex>
        <ButtonComponent label="Add to Card" onClick={handleAddToCard} />
      </Flex>
    </Flex>
  );
};

export default ProductCard;
