"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import "../../styles/hide_scroll_bar.css";
import ProductImage from "@components/ProductImage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import useInventorHooks from "../../hooks/inventoryhooks";
import ButtonComponent from "@components/button";

const ProductLandingPage = () => {
  const router = useRouter();
  const { products, getInventory } = useInventorHooks();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  useEffect(() => {
    const fetchProducts = async (cancelToken) => {
      if (products.length === 0) {
        await getInventory(cancelToken, (status, feedback) => {
          if (status !== 200) {
            console.error("Error fetching inventory:", feedback);
          }
        });
      }
    };

    const cancelToken = axios.CancelToken.source();
    
    // Fetch on mount
    fetchProducts(cancelToken.token);

    // Add event listeners for page visibility and focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchProducts(cancelToken.token);
      }
    };

    const handleFocus = () => {
      fetchProducts(cancelToken.token);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      cancelToken.cancel();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [getInventory, products.length]);

  return (
    <Flex w="full" h="full" bg="rgba(0,0,0,0.05)" justifyContent="center" flexDir="column" alignItems="center" p={4}>
      <Heading color="gray">Our Products</Heading>
      <Text>We sell brand new cars, second hand and auto parts.</Text>
      <Box w="full" mt={10}>
        <Flex overflowX="auto" gap={10} className="scrollbar-hide" pt={5} pb={5}>
          {products && products.length > 0 ? (
            products.slice(0, 5).map((value, index) => {
              let description2 = {};
              try {
                description2 = JSON.parse(value?.description2 || '{}');
              } catch (error) {
                console.warn('Failed to parse description2:', error);
              }

              return (
                <Box key={index} bg="white" h="50vh" boxShadow="lg" p={5} rounded={10}>
                  <Flex flexDir="column" w="25rem" h="full" pb={10} justifyContent="space-between" overflow="hidden">
                    <Box>
                      <ProductImage imageUrl={value.imageUrl} />
                      <Heading mt={2} size="lg">
                        {value.name}
                      </Heading>
                      <Text>{`${value.year || ''} ${value.model || ''}`}</Text>
                      <Text mt={5}>{description2?.engine_options || 'No engine details available'}</Text>
                    </Box>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text fontSize={18}>
                        <strong>{formatPrice(value.price || 0)}</strong>
                      </Text>
                      <ButtonComponent w="7rem" label="Buy now!" onClick={() => router.push("/login")} />
                    </Flex>
                  </Flex>
                </Box>
              );
            })
          ) : (
            <Text textAlign="center" w="full">No products available at the moment.</Text>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductLandingPage;
