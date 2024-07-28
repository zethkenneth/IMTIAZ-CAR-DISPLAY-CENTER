"use client";

import React from "react";
import Link from "next/link";
import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import ModalComponent from "@components/ModalComponent";
import ProductImage from "@components/ProductImage";
import ButtonComponent from "@components/button";
import { productJsonData } from "@app/dashboard/inventory/data";

function page() {
  const itemList = [productJsonData[0], productJsonData[1], productJsonData[2]];

  const Item = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(price);
    };

    function handleViewOrder() {
      onOpen();
    }

    function handleProceedOrder() {}

    const CartItemDesign = (propsData) => {
      return (
        <Flex
          alignItems="center"
          borderBottom="1px solid rgba(0,0,0,0.2)"
          p={2}
          gap={2}
          cursor="pointer"
          onClick={propsData.onClick}
        >
          <Box w={propsData.w} h={propsData.h}>
            <ProductImage imageUrl={props.imageUrl} h={propsData.h} />
          </Box>
          <Box>
            <Heading size={propsData.size ? "md" : "xs"}>{props.name}</Heading>
            <Text
              mt={2}
              fontSize={propsData.size ? propsData.size : 12}
            >{`${props.model} ${props.year}`}</Text>
            <Text
              mt={2}
              fontSize={propsData.size ? propsData.size : 12}
              fontWeight={600}
            >
              {formatPrice(props.price)}
            </Text>
          </Box>
        </Flex>
      );
    };

    return (
      <>
        <CartItemDesign onClick={handleViewOrder} w="6rem" h="4rem" />
        <ModalComponent
          size="2xl"
          isOpen={isOpen}
          onClose={onClose}
          withCloseButton={true}
        >
          <Flex justifyContent="space-between" gap={5} mt={2}>
            <Box>
              <Heading size="sm">My Cart</Heading>
              <CartItemDesign w="15rem" h="12rem" size={15} />
            </Box>
            <Box w="15rem" bg="gray.100" p={5} rounded={5}>
              <Box>
                <Heading size="sm">Order Details</Heading>
                <Flex
                  fontSize={12}
                  mt={5}
                  fontWeight={600}
                  justifyContent="space-between"
                >
                  <Text>Sub Total</Text>
                  <Text>{formatPrice(props.price)}</Text>
                </Flex>
                <Flex
                  fontSize={12}
                  mt={3}
                  fontWeight={600}
                  justifyContent="space-between"
                >
                  <Text>Discount</Text>
                  <Text>{formatPrice(props.price)}</Text>
                </Flex>
                <Flex
                  fontSize={12}
                  mt={3}
                  fontWeight={600}
                  justifyContent="space-between"
                >
                  <Text>Tax</Text>
                  <Text>{formatPrice(props.price)}</Text>
                </Flex>
                <Flex
                  fontSize={14}
                  mt={5}
                  fontWeight={600}
                  justifyContent="space-between"
                >
                  <Text>Total</Text>
                  <Text>{formatPrice(props.price)}</Text>
                </Flex>
              </Box>
              <Box mt={5}>
                <ButtonComponent
                  label="Proceed Order"
                  onClick={handleProceedOrder}
                />
              </Box>
            </Box>
          </Flex>
        </ModalComponent>
      </>
    );
  };

  return (
    <Flex w="100%" h="inherit">
      <Box w="inherit" p={5}>
        <Heading size="lg">Your Order Details</Heading>
        <Box mt={10}>
          <Heading size="sm">Order Code: 1241323</Heading>
          <Box mt={5}>
            <Box>
              {itemList.map((value, i) => (
                <Item key={i} {...value} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box w="inherit" p={5}>
        Payment Details
      </Box>
    </Flex>
  );
}

export default page;
