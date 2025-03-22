'use client'
import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
  useToast,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import formatprice from "@utils/formatprice";
import ProductImage from "./ProductImage";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "./button";
import useCartHook from "@hooks/carthooks";
import formatPrice from "@utils/formatprice";
import AnimatedButton from "./AnimatedButton";
import useInventorHooks from "@hooks/inventoryhooks";
import { useState } from "react";
import axios from "axios";

const baseURL = "/api/imtiaz";

const MenuCartButton = () => {
  const { cart, placeOrder, resetCart } = useCartHook();
  const { getInventory } = useInventorHooks();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handlePlaceOrder(e, stopLoading) {
    if (!stopLoading) {
      stopLoading = () => {};
    }
    
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
        toast({
          title: "Error",
          description: "All fields are required",
          status: "error",
          duration: 3000,
          isClosable: true
        });
        stopLoading();
        return;
      }

      // Check existing customer
      const checkCustomerResponse = await axios.get('/api/imtiaz/customers/check', {
        params: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName
        }
      });

      let customerId;
      
      if (checkCustomerResponse.data.status === 200) {
        // Customer exists, use existing ID
        customerId = checkCustomerResponse.data.customerId;
      } else {
        // Create new customer
        const createCustomerResponse = await axios.post('/api/imtiaz/customers', customerInfo);
        if (createCustomerResponse.data.status === 200) {
          customerId = createCustomerResponse.data.customerId;
        } else {
          throw new Error("Failed to create customer");
        }
      }

      if (!customerId) {
        throw new Error("Failed to get or create customer ID");
      }

      // Place order with customer ID
      await placeOrder(async (status, feedback) => {
        if (status !== 200) {
          toast({
            title: "Error",
            description: feedback,
            status: "error",
            duration: 3000,
            isClosable: true
          });
          stopLoading();
          return;
        }

        // Update order with customer ID if needed
        try {
          await axios.put(`${baseURL}/orders/${feedback.orderId}`, {
            customerId: customerId
          });
        } catch (error) {
          console.error("Error updating order with customer ID:", error);
          // Continue with the process even if this fails
        }

        toast({
          title: "Success",
          description: "Order placed successfully",
          status: "success",
          duration: 3000,
          isClosable: true
        });
        
        getInventory().then(result => {
          if (result.status !== 200) {
            console.error("Failed to refresh inventory:", result.message);
          }
        });
        
        onClose();
        resetCart();
        setCustomerInfo({
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        });
        stopLoading();
      }, customerId);  // Pass customerId to placeOrder

    } catch (error) {
      console.error("Error in handlePlaceOrder:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process order",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      stopLoading();
    } finally {
      setIsSubmitting(false);
    }
  }

  const Item = (props) => {
    const CartItemDesign = (propsData) => {
      return (
        <Flex
          alignItems="center"
          borderBottom="1px solid rgba(0,0,0,0.2)"
          p={2}
          gap={2}
        >
          <Box w={propsData.w || "10rem"} h={propsData.h || "6rem"}>
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

    return <CartItemDesign />;
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
        size="4xl"
        footer={
          <AnimatedButton
            label="Place Order"
            loadingLabel="Processing"
            onClick={handlePlaceOrder}
            isDisabled={isSubmitting || cart.products.length === 0}
          />
        }
      >
        <Box>
          <Text mb={4}>
            {"After placing an order the details of order will be display give this to the customer the payment code. Thank you."}
          </Text>
          
          {/* Customer Information Form */}
          <Box mb={6} p={4} bg="gray.50" borderRadius="md">
            <Heading size="sm" mb={4}>Customer Information</Heading>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </FormControl>
            </SimpleGrid>
          </Box>

          {/* Existing cart items */}
          {cart.products.map((value, i) => (
            <Item key={i} {...value} />
          ))}
          
          <Flex gap={5} mt={5} justifyContent="space-between">
            <Flex gap={3}>
              <Text>Quantity : </Text>
              <Text>
                <strong>{cart?.quantity ?? 0}</strong>
              </Text>
            </Flex>
            <Flex gap={3}>
              <Text>Total Amount : </Text>
              <Text>
                <strong>{formatPrice(cart?.total_amount ?? 0)}</strong>
              </Text>
            </Flex>
          </Flex>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default MenuCartButton;
