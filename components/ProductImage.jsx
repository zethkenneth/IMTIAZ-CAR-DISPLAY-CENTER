import { useState } from "react";
const { Box, Button, Flex } = require("@chakra-ui/react");
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ProductImage = ({imageUrl, isCarousel = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? imageUrl.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === imageUrl.length - 1 ? 0 : prevIndex + 1
        );
    };

    if(isCarousel){
        return (
            <Box position="relative" overflow="hidden" h="10rem">
                <Box position="relative" h="100%" w="full">
                    <Box
                        display="flex"
                        transition="transform 0.5s ease-in-out"
                        transform={`translateX(-${currentIndex * 100}%)`}
                        h="100%"
                        w="full"
                    >
                        {imageUrl.map((url, index) => (
                        <Box
                            key={index}
                            flexShrink="0"
                            p="2"
                            h="100%"
                            w="full"
                            bgSize="contain"
                            bgRepeat="no-repeat"
                            bgPos="center"
                            style={{
                            backgroundImage: `url(${url})`,
                            mixBlendMode: "multiply",
                            }}
                        ></Box>
                        ))}
                    </Box>

                    <Button
                        position="absolute"
                        top="50%"
                        left="0"
                        color='gray.300'
                        transform="translateY(-50%)"
                        onClick={handlePrev}
                        bg="transparent"
                        _hover={{ bg: "gray.200",bg:"transparent"  }}
                        zIndex="1"
                    >
                        <ChevronLeftIcon className="w-8 h-8" />
                    </Button>
                    <Button
                        position="absolute"
                        top="50%"
                        right="0"
                        color='gray.300'
                        transform="translateY(-50%)"
                        onClick={handleNext}
                        bg="transparent"
                        _hover={{ bg: "gray.200",bg:"transparent" }}
                        zIndex="1"
                    >
                        <ChevronRightIcon className="w-8 h-8" />
                    </Button>

                    {/* Dot Indicators */}
                    <Flex justifyContent="center" mt="4" position="absolute" bottom="0" left="0" w="full">
                        {imageUrl.map((_, index) => (
                        <Box
                            key={index}
                            w="8px"
                            h="8px"
                            bg={index === currentIndex ? "gray.800" : "gray.500"}
                            borderRadius="50%"
                            mx="2"
                            opacity={index === currentIndex ? 1 : 0.5}
                        ></Box>
                        ))}
                    </Flex>
                </Box>
            </Box>
        );
    }

    return (
        <Box position="relative" overflow="hidden" h="10rem">
            <Box
            flexShrink="0"
            p="2"
            h="10rem"
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPos="center"
            style={{
                backgroundImage: `url(${imageUrl[0]})`,
                mixBlendMode: "multiply",
            }}
            ></Box>
        </Box>
    );
};

export default ProductImage;