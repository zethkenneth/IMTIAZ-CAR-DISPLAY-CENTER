import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import formatprice from "@utils/formatprice";
import ProductImage from "./ProductImage";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "./button";
import useCartHook from "@hooks/carthooks";
import formatPrice from "@utils/formatprice";

const MenuCartButton = () => {
  const { cart } = useCartHook();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Item = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
              {formatprice(props.price)}
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
                  <Text>{formatprice(props.price)}</Text>
                </Flex>
                <Flex
                  fontSize={12}
                  mt={3}
                  fontWeight={600}
                  justifyContent="space-between"
                >
                  <Text>Discount</Text>
                  <Text>{formatprice(props.price)}</Text>
                </Flex>
                <Flex
                  fontSize={12}
                  mt={3}
                  fontWeight={600}
                  justifyContent="space-between"
                >
                  <Text>Tax</Text>
                  <Text>{formatprice(props.price)}</Text>
                </Flex>
                <Flex
                  fontSize={14}
                  mt={5}
                  fontWeight={600}
                  justifyContent="space-between"
                >
                  <Text>Total</Text>
                  <Text>{formatprice(props.price)}</Text>
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
    <Box w="inherit" h="inherit">
      <Box position="relative" display="inline-block">
        <IconButton
          border="none"
          icon={<ShoppingCartIcon className="h-6 w-6" />}
          variant="outline"
          rounded={25}
          _hover={{ bg: "transparent" }}
          onClick={() => onOpen()}
        />
        {cart.products.length > 0 && (
          <Badge
            colorScheme="red"
            borderRadius="full"
            position="absolute"
            top="-1"
            right="-1"
            px={2}
            py={1}
            fontSize="0.8em"
          >
            <Text fontSize={10}>{cart.products.length}</Text>
          </Badge>
        )}
      </Box>
      <ModalComponent
        title="Cart"
        isOpen={isOpen}
        onClose={onClose}
        withCloseButton={true}
      >
        <Box>
          <Flex gap={5}>
            <Flex gap={3}>
              <Text>Total Product</Text>
              <Text>
                <strong>{cart?.products?.length ?? 0}</strong>
              </Text>
            </Flex>
            <Flex gap={3}>
              <Text>Total Amount</Text>
              <Text>
                <strong>{formatPrice(cart?.total_amount ?? 0)}</strong>
              </Text>
            </Flex>
          </Flex>
          {cart.products.map((value, i) => (
            <Item key={i} {...value} />
          ))}
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default MenuCartButton;
