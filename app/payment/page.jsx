"use client";

import React from "react";
import { Box, Button, Flex, Heading, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { productJsonData } from "@app/dashboard/inventory/data";
import { IoArrowBack, IoCartOutline } from "react-icons/io5";
import ModalComponent from "@components/ModalComponent";
import ProductImage from "@components/ProductImage";
import ButtonComponent from "@components/button";
import { useRouter } from "next/navigation";
import { FaOpencart } from "react-icons/fa";
import Image from "next/image";


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

  return (
    <Flex
        alignItems="center"
        borderBottom="1px solid rgba(0,0,0,0.1)"
        p={2}
        pt={5}
        pb={5}
        gap={2}
        cursor="pointer"
        onClick={props.onClick}
      >
        <Box w="30%" h="15vh">
          <ProductImage imageUrl={props.imageUrl} h="15vh" />
        </Box>
        <Box w="70%">
          <Heading size="md">{props.name}</Heading>
          <Text
            mt={2}
            fontSize={props.size ? props.size : 14}
          >{`${props.model} ${props.year}`}</Text>
          <Text
            mt={2}
            fontSize={props.size ? props.size : 14}
            fontWeight={400}
          >
            {props.description2.overview}
          </Text>
          <Flex justifyContent='space-between'>
            <Text
              mt={2}
              fontSize={props.size ? props.size : 17}
              fontWeight={600}
            >
              {formatPrice(props.price)}
            </Text>
            <Flex gap={2} alignItems='center'>
              <ButtonComponent label="+" />
              <Text fontSize={18}>10</Text>
              <ButtonComponent label="-" />
            </Flex>
          </Flex>
        </Box>
      </Flex>
  );
};

const Payment = () => {
  const router = useRouter();
  const itemList = [productJsonData[0], productJsonData[1], productJsonData[2]];

  const formatPriceData = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  return (
    <Flex w="100%" h="100vh" bg="#f3f4f6" gap={10}>
      <Box flex={4} w="inherit" p={5} bg="white">
        <Flex gap={5} alignItems='center'>
          <IconButton 
            bg='transparent'
            icon={<IoArrowBack size={25} color='gray' />}
            _hover={{bg: "transparent"}}
            onClick={() => router.back()}
          />
          <Heading size="sm">Order Checkout</Heading>
        </Flex>
        <Box mt={10}>
          <Flex gap={2} color='orange'>
            <FaOpencart className="w-10 h-10" />
            <Heading size="lg">Your Cart</Heading>
          </Flex>
          <Box mt={5}>
            <Box>
              {itemList.map((value, i) => (
                <Item key={i} {...value} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Flex flex={2} justifyContent='center' alignItems='center' w="inherit">
        <Box w="80%" h="51vh" bg="white" p={5} rounded={10} boxShadow='md'>
          <Flex mb={10} gap={3} alignItems='center'>
              <Image
                src="assets/images/logo.svg"
                alt="LOGO!"
                width={40}
                height={40}
                className="object-contain"
              />
              <Heading size="md">IMTIAZ</Heading>
          </Flex>
          <Text mb={5} fontSize={12} p={2} bg='#e7e3e3' rounded={5}>
              You can proceed your order to checkout here, yet anything changes you plan todo will you need to sign in first.
              Online payment is the only supported payment process.
          </Text>
          <Heading size='sm'>Order Summary</Heading>
          <Box mt={10}>
            <Flex justifyContent='space-between' mb={3} alignItems='center'>
              <Text fontSize={17}><strong>Order Code:</strong></Text>
              <Text fontSize={17}>1241323</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text fontSize={16}><strong>Vat</strong></Text>
              <Text fontSize={16}>{formatPriceData(12345)}</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text fontSize={16}><strong>Sub Total</strong></Text>
              <Text fontSize={16}>{formatPriceData(2051002)}</Text>
            </Flex>
            <Flex justifyContent='space-between' mt={5}>
              <Text fontSize={17} fontWeight={600} color="orange"><strong>Total</strong></Text>
              <Text fontSize={17}><strong>{formatPriceData(2051002)}</strong></Text>
            </Flex>
            <Box mt={8}>
              <ButtonComponent 
                label="Checkout"
              />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Payment;
