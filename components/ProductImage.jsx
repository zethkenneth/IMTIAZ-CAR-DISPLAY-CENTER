import React, { useState, useEffect } from 'react';
const { Box, Button, Flex } = require("@chakra-ui/react");
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Image } from "@chakra-ui/react";

const ProductImage = ({ imageUrl, h, fallbackSrc = "/no-image.png", cacheKey, contain }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgSrc, setImgSrc] = useState(imageUrl);
    const [isLoading, setIsLoading] = useState(true);

    // If imageUrl is null or empty, use a default image
    const images = imageUrl?.length ? imageUrl : ['/assets/images/no-image.png'];

    useEffect(() => {
        setImgSrc(imageUrl);
    }, [imageUrl]);

    const handlePrev = (e) => {
        e.stopPropagation()
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = (e) => {
        e.stopPropagation()
        setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleError = () => {
        if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    if(Array.isArray(imageUrl) && imageUrl.length > 0) {
        return (
            <Box position="relative" overflow="hidden" h="160px" minH="160px">
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
                            h="100%"
                            w="full"
                            bgSize={contain ? "contain": "cover"}
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
                        left="2"
                        transform="translateY(-50%)"
                        onClick={(e)=>handlePrev(e)}
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
                        right="2"
                        transform="translateY(-50%)"
                        onClick={(e)=>handleNext(e)}
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
        <Box h="160px" minH="160px" position="relative">
            <Image
                src={imgSrc}
                alt="Product"
                objectFit="cover"
                w="100%"
                h="100%"
                loading="lazy"
                onError={handleError}
                opacity={isLoading ? 0.5 : 1}
                transition="opacity 0.3s"
                onLoad={() => setIsLoading(false)}
                key={cacheKey}
                fallbackSrc={fallbackSrc}
            />
        </Box>
    );
};

export default ProductImage;