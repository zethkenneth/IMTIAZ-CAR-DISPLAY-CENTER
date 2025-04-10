import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import ButtonComponent from "@components/button";
import DeletePrompt from "@components/DeletePrompt";
import ModalComponent from "@components/ModalComponent";
import ProductImage from "@components/ProductImage";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import useCartHook from "@hooks/carthooks";
import React, { useState } from "react";
import axios from "axios";
import useInventorHooks from "@hooks/inventoryhooks";

const ProductCard = ({
  imageUrl,
  name,
  description,
  description2,
  type,
  price,
  isInventoryDisplay,
  year,
  model,
  quantity,
  edit,
  productID,
  product,
  quantityOnHand,
  chasis
}) => {
  const { addToCart } = useCartHook();
  const { getInventory } = useInventorHooks();
  const toast = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([imageUrl]);

  function handleEdit() {
    edit(product);
  }

  const DeletePromptButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteClick = (e) => {
      if (e) {
        e.stopPropagation(); // Add safety check
      }
      onOpen();
    };

    const handleCancelDelete = () => {
      onClose();
    };

    async function handleSubmitDelete() {
      try {
        if (!productID) {
          console.error('Product object:', product);
          throw new Error('Product ID not found');
        }

        const response = await axios.delete(`/api/imtiaz/products/${productID}`);
        if (response.status === 200) {
          toast({
            title: "Success",
            description: "Product deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          await getInventory();
          onClose();
        }
      } catch (error) {
        console.error('Delete error:', error);
        console.error('Product object:', product);  // Add this for debugging
        toast({
          title: "Error",
          description: error.message || "Failed to delete product",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }

    return (
      <>
        <ButtonComponent
          label="Delete"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={handleDeleteClick}
        />
        <DeletePrompt
          isOpen={isOpen}
          onClose={onClose}
          handleSubmit={handleSubmitDelete}
          handleCancel={handleCancelDelete}
        >
          <Box>
            <ProductImage imageUrl={imageUrl} h="200px" />
            <Box mt={4}>
              <Text fontWeight="bold" fontSize="lg">{name}</Text>
              <Text mt={2} fontSize="sm" color="gray.600">{description}</Text>
              <Flex mt={3} justifyContent="space-between">
                <Text><strong>Type:</strong> {type}</Text>
                <Text><strong>Quantity:</strong> {quantityOnHand}</Text>
              </Flex>
            </Box>
          </Box>
        </DeletePrompt>
      </>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  const ViewProduct = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleAddToCard(e) {
      e.stopPropagation()
      addToCart(product);
    }

    return (
      <>
        <Flex
          bg="white"
          width="20rem"
          maxW="sm"
          sm={{ width: "1/3" }}
          h="25rem"
          d="flex"
          flexDirection="column"
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          {children}
        </Flex>
        <ModalComponent
          title={null}
          withCloseButton={true}
          isOpen={isOpen}
          onClose={onClose}
          size="3xl"
          footer={
            <Box>
              <ButtonComponent
                label="Add To Cart"
                icon={<ShoppingCartIcon className="w-5 h-5" />}
                onClick={(e)=> handleAddToCard(e)}
                style={{ color: "white" }}
              />
            </Box>
          }
        >
          <Box maxH="80vh" overflow="auto">
            <Box bg="white" p={4} rounded="lg">
              <ProductImage imageUrl={imageUrl} isCarousel={true} />
              <Box mt={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Heading size="md">{name}</Heading>
                  <Flex gap={5} alignItems="center">
                    <Text fontSize={12} fontWeight={600}>
                      <strong>Model:</strong> {`${model}-${year}`}
                    </Text>
                    <Text>
                      <strong>Price:</strong> {formatPrice(price)}
                    </Text>
                  </Flex>
                </Flex>
                <Text mt={4} fontSize="13" fontWeight="bold">
                      Overview:
                    </Text>
                    <Text mt={2} fontSize={12}>
                      {description}
                  </Text>
                {description2 && (
                  <Box overflowY="scroll" height="35vh">
                    <Text mt={4} fontSize="13" fontWeight="bold">
                      Key Features:
                    </Text>
                    <VStack align="start" mt={2} spacing={2} fontSize="12">
                      <Text>
                        <strong>Engine Options:</strong> {description2.engine_options}
                      </Text>
                      <Text>
                        <strong>Transmission:</strong> {description2.transmissions}
                      </Text>
                      <Text>
                        <strong>Fuel Efficiency:</strong> {description2.fuel_efficiency}
                      </Text>
                      <Text>
                        <strong>Interior:</strong> {description2.interior}
                      </Text>
                      <Text>
                        <strong>Safety:</strong> {description2.safety}
                      </Text>
                      <Text>
                        <strong>Comfort:</strong> {description2.comfort}
                      </Text>
                      <Text>
                        <strong>Design:</strong> {description2.design}
                      </Text>
                    </VStack>

                    <Text mt={4} fontSize="13" fontWeight="bold">
                      Performance:
                    </Text>
                    <Text fontSize={12}>
                      {description2.performance}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </ModalComponent>
      </>
    );
  };

  return (
    <ViewProduct>
      <Box h="160px" minH="160px">
        <ProductImage imageUrl={imageUrl} />
      </Box>
      <Flex
        flex="1"
        w="full"
        p="4"
        pt="2"
        flexDirection="column"
        justifyContent="space-between"
        minH="0"
      >
        <Box flex="1" overflow="hidden">
          <Heading as="h2" size="md" color="gray.900" fontWeight="bold" mb="2">
            {name}
          </Heading>
          <Text fontSize={13} noOfLines={3}>
            {description}
          </Text>
          <Text fontSize={13} mt={2}>
            <strong>{type}</strong>
          </Text>
        </Box>
        
        <Box mt="auto" pt="2">
          <Text color="gray.900" fontSize="sm">
            <strong>Price:</strong> {formatPrice(price)}
          </Text>
          {/* <Text color="gray.900" fontSize="sm" mt={1}>
            <strong>Quantity:</strong> {quantityOnHand || 0}
          </Text> */}
          <Text color="gray.900" fontSize="sm" mt={1}>
            <strong>Chasis:</strong> {chasis}
          </Text>
          
          {isInventoryDisplay ? (
            <Flex gap={5} mt={2}>
              <ButtonComponent label="Edit" onClick={handleEdit} />
              <DeletePromptButton />
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
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </Flex>
    </ViewProduct>
  );
};

export default ProductCard;
