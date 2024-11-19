import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Spinner,
  FormControl,
  IconButton,
  Flex,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import useChatHooks from "@hooks/chathooks";

const Chatbot = () => {
  const { greetMe, messages, send } = useChatHooks();
  const [message, setMessage] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGreetings, setLoadingGreetings] = useState(false);

  function clearMessage() {
    setMessage("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => setLoading(false), 5200);

    send(message, clearMessage, (status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        return console.log(feedback);
      }
      setTimeout(() => setLoading(false), 200);
    });
  };

  useEffect(() => {
    if (messages.length === 0 && openChat) {
      setLoadingGreetings(true);
      greetMe((status, feedback) => {
        if (!(status >= 200 && status < 300)) {
          return console.log(feedback);
        }
        setLoadingGreetings(false);
      });
    }
  }, [openChat]);

  return (
    <Box
      backgroundColor="red"
      position="fixed"
      bottom="2em"
      right="2em"
      p="4"
      bg="white"
      shadow="lg"
      rounded="lg"
      w="20em"
    >
      <Flex
        gap={10}
        position="fixed"
        bottom="2em"
        right="2em"
        shadow="lg"
        rounded="lg"
        bg="#FF5722"
        p="4px 6px"
        pr="15px"
        borderRadius={25}
        alignItems="center"
        cursor="pointer"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        onClick={() => setOpenChat(!openChat)}
      >
        <Image
          src="assets/images/logo-white.svg"
          alt="LOGO!"
          width={30}
          height={30}
          className="object-contain"
        />
        <Text fontWeight={600} color="white">
          As AI
        </Text>
      </Flex>
      {openChat && (
        <Box
          backgroundColor="red"
          position="fixed"
          bottom="6em"
          right="2em"
          bg="white"
          shadow="lg"
          rounded="lg"
          borderRadius={5}
          w="20em"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          overflow="hidden"
        >
          <VStack spacing="4" h="25em">
            <Flex
              w="100%"
              h="2em"
              bg="#FF5722"
              justifyContent="space-between"
              alignItems="center"
              pr={5}
              pl={10}
            >
              <Text fontSize={14} fontWeight={600} color="white">
                Talk with AI
              </Text>
              <IconButton
                icon={<IoClose color="white" />}
                onClick={() => setOpenChat(!openChat)}
              />
            </Flex>
            <Box
              flex="1"
              overflowY="auto"
              border="1px"
              borderColor="gray.300"
              rounded="md"
              w="100%"
              p="0.8em"
              pb="0.5em"
            >
              {messages.map((obj, index) => (
                <Flex
                  justifyContent={obj.sent_by === "ai" ? "start" : "end"}
                  key={index}
                  mb="4"
                >
                  {/* User Message */}
                  <Box
                    bg={obj.sent_by === "ai" ? "#FF5722" : "gray"}
                    p="3px"
                    pl="5px"
                    borderRadius="5px"
                    maxW="70%"
                    alignSelf="flex-end"
                    boxShadow="sm"
                  >
                    <Text fontSize="12px" color="white">
                      {obj.content}
                    </Text>
                  </Box>
                </Flex>
              ))}

              {loading ||
                (loadingGreetings && (
                  <Text color="gray.500">
                    <Spinner size="sm" mr="2" /> Typing...
                  </Text>
                ))}
            </Box>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <HStack p="0.8em" pb="0.5em">
                <FormControl w="100%" isRequired>
                  <Input
                    autoComplete="new password"
                    w="100%"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    bg="gray.50"
                    p="2px 5px"
                    borderColor="gray.300"
                    focusBorderColor="orange"
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isDisabled={loading}
                  isLoading={loading}
                  color="#FF5722"
                >
                  <IoSend />
                </Button>
              </HStack>
            </form>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Chatbot;
