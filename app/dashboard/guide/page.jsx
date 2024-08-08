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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FormController from "@components/FormController";
import ModalComponent from "@components/ModalComponent";
import guides from "@data/guide_data";
import { useState } from "react";

const Guide = () => {
  const [selectedGuide, setSelectedGuide] = useState(guides[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState(null);

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

  const filteredGuides =
    search === null
      ? guides
      : guides.filter(
          (guide) =>
            guide.title.toLowerCase().includes(search.toLowerCase()) ||
            guide.summary.toLowerCase().includes(search.toLowerCase())
        );

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
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="lg" mb="4">
          Car Guide Troubleshooting and Maintenance
        </Heading>
        <Box w="14rem">
          <FormController
            rounded={25}
            name="search"
            errorMessage={null}
            placeholder="Search maintenance"
            value={search}
            setValue={setSearch}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </FormController>
        </Box>
      </Flex>
      <Box w="inherit" pb={10}>
        <Grid
          mt={5}
          templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
          gap={4}
        >
          {filteredGuides.map((guide) => (
            <Box
              p="4"
              h="13rem"
              bg="white"
              boxShadow="lg"
              key={guide.id}
              cursor="pointer"
              borderRadius="lg"
              overflow="hidden"
              transform="scale(1)"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.02)" }}
              onClick={() => openModal(guide)}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md" mb="2">
                  {guide.title}
                </Heading>
                {guide.icon}
              </Flex>
              <Text fontSize={14} mt={5}>
                {guide.summary}
              </Text>
              <Text fontSize="14px" mt="2">
                {guide.content.slice(0, 100)}...
              </Text>
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
    </Box>
  );
};

export default Guide;
