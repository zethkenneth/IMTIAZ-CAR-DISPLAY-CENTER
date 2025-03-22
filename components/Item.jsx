import React from 'react';
import {
  Box,
  Flex,
  Text,
  Image as ChakraImage,
} from "@chakra-ui/react";
import formatPrice from "@utils/formatprice";

const Item = ({ 
  productName, 
  description, 
  imageUrl, 
  quantity, 
  unitPrice, 
  totalPrice 
}) => {
  // Handle array of image URLs
  const displayImage = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
  
  return (
    <Flex 
      w="100%" 
      gap={5} 
      p={3} 
      borderBottom="1px" 
      borderColor="gray.200"
      alignItems="center"
    >
      <Box 
        w="100px" 
        h="100px" 
        position="relative"
        overflow="hidden"
        borderRadius="md"
      >
        <ChakraImage
          src={displayImage || '/assets/images/no-image.png'}
          alt={productName}
          w="100%"
          h="100%"
          objectFit="contain"
          fallback={<Box w="100%" h="100%" bg="gray.100" />}
        />
      </Box>
      
      <Box flex={1}>
        <Text fontSize="lg" fontWeight="bold">{productName}</Text>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {description}
        </Text>
        <Flex justifyContent="space-between" mt={2}>
          <Text fontSize="sm">Quantity: {quantity}</Text>
          <Text fontSize="sm">Unit Price: {formatPrice(unitPrice)}</Text>
        </Flex>
        <Text fontSize="md" fontWeight="bold" textAlign="right" mt={1}>
          Total: {formatPrice(totalPrice)}
        </Text>
      </Box>
    </Flex>
  );
};

export default Item; 