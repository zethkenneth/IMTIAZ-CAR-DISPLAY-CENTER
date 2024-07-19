import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import ButtonComponent from "@components/button";
import React from "react";

const ProductCard = ({
  imageUrl,
  name,
  description,
  type,
  price,
  isInventoryDisplay,
  edit,
}) => {
  function handleEdit() {
    edit();
  }

  function handleRemove() {}

  function handleAddToCart() {}

  return (
    <Flex
      width="20rem"
      maxW="sm"
      sm={{ width: "1/3" }}
      h="25rem"
      d="flex"
      flexDirection="column"
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      m="4"
    >
      <Box
        flexShrink="0"
        p="2"
        h="10rem"
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPos="center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          mixBlendMode: "multiply",
        }}
      ></Box>
      <Flex
        flex="1"
        w="full"
        p="4"
        pt="2"
        flexDirection="column"
        justifyContent="space-between"
        leading="normal"
      >
        <Box mb="2">
          <Heading as="h2" size="md" color="gray.900" fontWeight="bold" mb="2">
            {name}
          </Heading>
          <Text fontSize={13}>{description}</Text>
          <Text fontSize={13} mt={2}>
            <strong>{type}</strong>
          </Text>
        </Box>
        <Box mb="2">
          <Text color="gray.900" fontSize="sm">
            Price: <strong>${price.toFixed(2)}</strong>
          </Text>
        </Box>
        {isInventoryDisplay ? (
          <Flex gap={5}>
            <ButtonComponent label="Edit" onClick={handleEdit} />
            <ButtonComponent
              label="Remove"
              style={{ backgroundColor: "red" }}
              onClick={handleRemove}
            />
          </Flex>
        ) : (
          <Button
            w="full"
            bg="orange"
            mt="2"
            color="white"
            fontWeight="medium"
            py="1"
            px="2"
            rounded="lg"
            _hover={{ bg: "orange" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductCard;
