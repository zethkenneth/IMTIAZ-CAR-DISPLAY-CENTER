import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ButtonComponent from "@components/button";
import DeletePrompt from "@components/DeletePrompt";
import ModalComponent from "@components/ModalComponent";
import ProductImage from "@components/ProductImage";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import useCartHook from "@hooks/carthooks";
import React, { useState } from "react";

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
  product,
}) => {
  const { addToCart } = useCartHook();
  function handleEdit() {
    edit();
  }

  const DeletePromptButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    function handleSubmitDelete() {}

    function handleCancelDelete() {
      onClose();
    }

    const handleOpenModal = (e) => {
      if (e && e.stopPropagation) {
        e.preventDefault();
        e.stopPropagation();
      }
      onOpen();
    };

    return (
      <>
        <ButtonComponent
          label="Remove"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={handleOpenModal}
        />
        <DeletePrompt
          isOpen={isOpen}
          onClose={onClose}
          handleSubmit={handleSubmitDelete}
          handleCancel={handleCancelDelete}
        >
          <Box w="inherit" h="30vh">
            <ProductImage imageUrl={imageUrl} />
            <Flex
              flex="1"
              w="full"
              pt="2"
              flexDirection="column"
              justifyContent="space-between"
              leading="normal"
            >
              <Box mb="2">
                <Heading
                  as="h2"
                  size="md"
                  color="gray.900"
                  fontWeight="bold"
                  mb="2"
                >
                  {name}
                </Heading>
                <Text fontSize={13}>{description}</Text>
                <Text fontSize={13} mt={2}>
                  <strong>{type}</strong>
                </Text>
              </Box>
              <Box mb="2">
                <Text color="gray.900" fontSize="sm">
                  Price: <strong>${parseFloat(price).toFixed(2)}</strong>
                </Text>
              </Box>
            </Flex>
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
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleAddToCard() {
      addToCart(product);
      toast({
        title: "Product added.",
        description: `${product.name} has been added to your cart.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
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
          m="4"
          cursor="pointer"
          onClick={() => onOpen()}
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
                onClick={handleAddToCard}
                style={{ color: "white" }}
              />
            </Box>
          }
        >
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
            {description2 && (
              <Box overflowY={"scroll"} height="35vh">
                <Text mt={4} fontSize="13" fontWeight="bold">
                  Overview:
                </Text>
                <Text mt={2} fontSize={12}>
                  {description2?.overview}
                </Text>
                <Text mt={2} fontSize="13" fontWeight="bold">
                  Key Features:
                </Text>
                <VStack align="start" mt={2} spacing={2} fontSize="12">
                  <Text>
                    <strong>Engine Options:</strong> The Civic offers a variety
                    of engine choices, including a fuel-efficient four-cylinder
                    engine and a turbocharged option for more power. Some models
                    also offer a high-performance variant, such as the Civic Si
                    or Type R.
                  </Text>
                  <Text>
                    <strong>Transmission:</strong> The Civic typically comes
                    with a choice of a continuously variable transmission (CVT)
                    for smooth and efficient driving or a manual transmission in
                    some sporty models.
                  </Text>
                  <Text>
                    <strong>Fuel Efficiency:</strong> Known for its excellent
                    fuel economy, the Civic is a cost-effective option for daily
                    driving. The standard engine provides impressive miles per
                    gallon (MPG), making it a great choice for those seeking to
                    minimize fuel costs.
                  </Text>
                  <Text>
                    <strong>Interior:</strong>
                    {`The Civic's interior is spacious for a compact car, with high-quality materials and a user-friendly layout. Features often include a touchscreen infotainment system with Apple CarPlay and Android Auto, available leather upholstery, and a comfortable seating arrangement.`}
                  </Text>
                  <Text>
                    <strong>Safety:</strong> Honda prioritizes safety in the
                    Civic, equipping it with advanced safety features such as
                    Honda Sensing, which includes adaptive cruise control, lane
                    departure warning, automatic emergency braking, and
                    collision mitigation braking.
                  </Text>
                  <Text>
                    <strong>Comfort:</strong>
                    {`The Civic offers a comfortable ride with supportive seats and a well-tuned suspension system. Available features might include dual-zone climate control, heated front seats, and a power-adjustable driver's seat.`}
                  </Text>
                  <Text>
                    <strong>Design:</strong>
                    {`The exterior design of the Civic is modern and sporty, with clean lines, a bold front grille, and available alloy wheels. The design is both functional and aesthetically pleasing, contributing to the Civic's overall appeal.`}
                  </Text>
                </VStack>

                <Text mt={2} fontSize="13" fontWeight="bold">
                  Performance:
                </Text>
                <Text fontSize={12}>
                  {`The Honda Civic delivers a dynamic driving experience with responsive handling and a choice of engines that cater to different driving styles. The ride quality is generally smooth, and the Civic's handling is agile, making it a fun car to drive while still being practical for everyday use.`}
                </Text>

                <Text mt={2} fontSize="13" fontWeight="bold">
                  Summary:
                </Text>
                <Text fontSize={12}>
                  {`The Honda Civic is a versatile and well-rounded compact car that excels in areas such as fuel efficiency, reliability, and driving dynamics. Its high-quality interior, advanced safety features, and engaging performance make it a strong contender in the compact car segment.`}
                </Text>
              </Box>
            )}
          </Box>
        </ModalComponent>
      </>
    );
  };

  return (
    <ViewProduct>
      <ProductImage imageUrl={imageUrl} />
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
          <Text fontSize={13}>
            {description.length > 150
              ? `${description.substring(0, 150)}...`
              : description}
          </Text>
          <Text fontSize={13} mt={2}>
            <strong>{type}</strong>
          </Text>
        </Box>
        <Box mb="2">
          <Text color="gray.900" fontSize="sm">
            <strong>Price:</strong> {formatPrice(price)}
          </Text>
        </Box>
        {isInventoryDisplay ? (
          <Flex gap={5}>
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
      </Flex>
    </ViewProduct>
  );
};

export default ProductCard;
