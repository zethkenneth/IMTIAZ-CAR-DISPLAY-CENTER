"use client";

import {
  Box,
  Flex,
  Grid,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "../../styles/hide_scroll_bar.css";
import { useRouter } from "next/navigation";
import ModalComponent from "@components/ModalComponent";
import guides from "@data/guide_data";
import { useState } from "react";

const GuideLandingPage = () => {
  const router = useRouter();
  const [selectedGuide, setSelectedGuide] = useState(guides[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (guide) => {
    setSelectedGuide(guide);
    onOpen();
  };

  // Function to convert snake_case to Title Case
  const formatTabTitle = (key) => {
    return key
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

  const GenerateTabList = (data) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const tabKeys = Object.keys(data);

    const handleTabChange = (index) => {
      setSelectedIndex(index);
    };

    return (
      <Tabs onChange={handleTabChange} index={selectedIndex}>
        <TabList>
          {tabKeys.map((key, index) => (
            <Tab key={key}>
              <Text fontSize={14} fontWeight={600}>
                {index === selectedIndex
                  ? formatTabTitle(key)
                  : formatTabTitle(key).slice(0, 20) +
                    (formatTabTitle(key).length > 20 ? "..." : "")}
              </Text>
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabKeys.map((key) => {
            return (
              <TabPanel key={key}>
                <Heading size="md" mb={5}>
                  {formatTabTitle(key)}
                </Heading>
                <Box>
                  {Object.entries(data[key]).map(([subKey, value]) => {
                    return (
                      <Box key={subKey} mb={2}>
                        <Text w="25rem">
                          <strong>{formatTabTitle(subKey)}</strong>
                        </Text>
                        <Text>{value}</Text>
                      </Box>
                    );
                  })}
                </Box>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    );
  };

  return (
    <Flex
      w="full"
      minH="100vh"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      p={4}
    >
      <Heading className="orange_gradient text-center" mb={4}>
        Maintenance Guide
      </Heading>
      <Text textAlign="center" maxW="600px" mb={8}>
        Ensure the longevity and performance of your vehicle with our detailed maintenance guide. Learn essential tips and procedures for keeping your car in top condition, covering everything from routine oil changes to advanced engine diagnostics.
      </Text>
      <Box w="full" mt={10}>
        <Grid
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={6}
          pt={5}
          pb={5}
        >
          {guides.slice(0, 10).map((guide) => (
            <Box
              p={4}
              bg="white"
              boxShadow="lg"
              key={guide.id}
              cursor="pointer"
              borderRadius="lg"
              overflow="hidden"
              className="group"
              _hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
              transition="all 0.3s ease-in-out"
              h="200px"
              onClick={() => openModal(guide)}
            >
              <Flex flexDir="column" h="full" justifyContent="space-between">
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Heading
                    size="md"
                    className="transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent"
                  >
                    {guide.title}
                  </Heading>
                  {guide.icon && (
                    <span className="transition-colors duration-300 ease-in-out group-hover:text-orange-600">
                      {guide.icon}
                    </span>
                  )}
                </Flex>
                <Text fontSize={14} mb={4} noOfLines={3}>
                  {guide.summary}
                </Text>
                <Text fontSize="14px" color="gray.500" noOfLines={2}>
                  {guide.content.slice(0, 100)}...
                </Text>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Box>
      <ModalComponent
        title={
          <Heading size="md" color="gray">
            {selectedGuide?.title}
          </Heading>
        }
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
        withCloseButton={true}
      >
        <Box w="100%" h="50vh">
          {selectedGuide === null
            ? null
            : GenerateTabList(selectedGuide?.information)}
        </Box>
      </ModalComponent>
    </Flex>
  );
};

export default GuideLandingPage;
