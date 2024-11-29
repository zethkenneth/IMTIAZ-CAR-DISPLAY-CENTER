import {
    Box,
    Flex,
    Heading,
    Text,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
  } from "@chakra-ui/react";
  
  const ProductCardAnimation = () => {
    return (
      <Box
        w="20rem"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="4"
        bg="white"
        boxShadow="lg"
      >
        {/* Product Image Skeleton */}
        <Skeleton h="8.5em" w="full" borderRadius="md" />
  
        <Flex
          flex="1"
          w="full"
          pt="4"
          flexDirection="column"
          justifyContent="space-between"
          leading="normal"
        >
          <Box mb="4">
            {/* Product Name Skeleton */}
            <SkeletonText mt="2" noOfLines={1} spacing="4" skeletonHeight="20px" />
            
            {/* Description Skeleton */}
            <SkeletonText mt="2" noOfLines={2} spacing="4" skeletonHeight="16px" />
          </Box>
  
          <Box mb="4">
            {/* Type Skeleton */}
            <Skeleton h="20px" w="50%" borderRadius="md" mt="2" />
          </Box>
  
          <Box mb="2">
            {/* Price Skeleton */}
            <Skeleton h="20px" w="30%" borderRadius="md" />
          </Box>
          <Skeleton h='2.4em' w='100%' borderRadius='md' mt={2} />
        </Flex>
      </Box>
    );
  };
  
  export default ProductCardAnimation;
  