import { useState } from "react";
const { Box, Button, Flex } = require("@chakra-ui/react");
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ProductImage = ({imageUrl = [], isCarousel = false, h='10rem' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // If imageUrl is null or empty, use a default image
    const images = imageUrl?.length ? imageUrl : ['/assets/images/no-image.png'];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
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
                        {images.map((url, index) => (
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
                        transform="translateY(-50%)"
                        onClick={handlePrev}
                        bg="#F4511E"
                        color="white"
                        _hover={{ 
                            bg: "#D84315",
                            transform: "translateY(-50%) scale(1.1)"
                        }}
                        _active={{
                            bg: "#BF360C"
                        }}
                        zIndex="1"
                        size="sm"
                        rounded="full"
                        shadow="md"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </Button>
                    <Button
                        position="absolute"
                        top="50%"
                        right="0"
                        transform="translateY(-50%)"
                        onClick={handleNext}
                        bg="#F4511E"
                        color="white"
                        _hover={{ 
                            bg: "#D84315",
                            transform: "translateY(-50%) scale(1.1)"
                        }}
                        _active={{
                            bg: "#BF360C"
                        }}
                        zIndex="1"
                        size="sm"
                        rounded="full"
                        shadow="md"
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                    </Button>

                    {/* Dot Indicators */}
                    <Flex justifyContent="center" mt="4" position="absolute" bottom="0" left="0" w="full">
                        {images.map((_, index) => (
                        <Box
                            key={index}
                            w="6px"
                            h="6px"
                            bg={index === currentIndex ? "#F4511E" : "gray.300"}
                            borderRadius="50%"
                            mx="1"
                            cursor="pointer"
                            onClick={() => setCurrentIndex(index)}
                            transition="all 0.2s"
                            _hover={{
                                transform: "scale(1.2)"
                            }}
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
                h={h}
                bgSize="contain"
                bgRepeat="no-repeat"
                bgPos="center"
                style={{
                    backgroundImage: `url(${images[0]})`,
                    mixBlendMode: "multiply",
                }}
            ></Box>
        </Box>
    );
};

export default ProductImage;