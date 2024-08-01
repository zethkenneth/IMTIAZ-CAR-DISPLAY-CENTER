"use client";
import { Box, Button, Flex, FormControl, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Input from "@components/Input/Input";
import { FaGears } from "react-icons/fa6";
import { useState } from "react";
import FormController from "@components/FormController";


const guides = [
  {
    "id": 1,
    "title": "Engine Overheating",
    "summary": "Learn how to diagnose and fix engine overheating issues.",
    "content": "Full guide on diagnosing and fixing engine overheating. This includes checking coolant levels, inspecting the radiator, and more.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 2,
    "title": "Brake Maintenance",
    "summary": "Steps to ensure your brakes are working properly.",
    "content": "Detailed guide on brake maintenance. This includes checking brake pads, brake fluid levels, and inspecting the brake system for wear and tear.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 3,
    "title": "Oil Change",
    "summary": "How to perform an oil change on your vehicle.",
    "content": "Step-by-step guide on how to change your car's oil, including what type of oil to use and how often to change it.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 4,
    "title": "Tire Maintenance",
    "summary": "Tips for maintaining your tires to ensure safety and longevity.",
    "content": "Guide on tire maintenance including checking tire pressure, rotating tires, and inspecting for wear and tear.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 5,
    "title": "Battery Care",
    "summary": "How to maintain and extend the life of your car battery.",
    "content": "Instructions on car battery care, including cleaning terminals, checking charge levels, and safe jump-starting practices.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 6,
    "title": "Transmission Maintenance",
    "summary": "Keep your transmission running smoothly with these tips.",
    "content": "Detailed guide on maintaining your car's transmission, including checking transmission fluid and recognizing signs of transmission issues.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 7,
    "title": "Air Filter Replacement",
    "summary": "Learn how to replace your car's air filter.",
    "content": "Step-by-step guide on replacing your car's air filter to ensure optimal engine performance and fuel efficiency.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 8,
    "title": "Spark Plug Replacement",
    "summary": "How to replace spark plugs to maintain engine performance.",
    "content": "Guide on replacing spark plugs, including how to choose the right plugs and the proper steps for replacement.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 9,
    "title": "Coolant Flush",
    "summary": "When and how to perform a coolant flush.",
    "content": "Instructions on performing a coolant flush to prevent engine overheating and maintain your cooling system.",
    "icon": <FaGears size={30} />
  },
  {
    "id": 10,
    "title": "Windshield Wiper Maintenance",
    "summary": "Ensure clear visibility by maintaining your windshield wipers.",
    "content": "Tips on maintaining and replacing windshield wipers for clear visibility in all weather conditions.",
    "icon": <FaGears />
  },
  {
    "id": 11,
    "title": "Suspension System Inspection",
    "summary": "Learn how to inspect and maintain your vehicle's suspension system.",
    "content": "Guide on checking for signs of wear or damage in your suspension system, including shocks, struts, and bushings. Includes tips on what to look for and when to seek professional help.",
    "icon": <FaGears />
  },
  {
    "id": 12,
    "title": "Fuel System Maintenance",
    "summary": "Keep your fuel system clean and efficient.",
    "content": "Steps for maintaining your car’s fuel system, including cleaning fuel injectors, checking fuel filters, and understanding symptoms of fuel system issues.",
    "icon": <FaGears />
  },
  {
    "id": 13,
    "title": "Headlight Restoration",
    "summary": "Improve visibility by restoring cloudy or hazy headlights.",
    "content": "Detailed guide on restoring headlight clarity, including cleaning techniques and products to use to remove oxidation and improve light output.",
    "icon": <FaGears />
  },
  {
    "id": 14,
    "title": "AC System Service",
    "summary": "Ensure your air conditioning system works efficiently.",
    "content": "Instructions for checking and maintaining your vehicle’s AC system, including how to recharge refrigerant, check for leaks, and replace the cabin air filter.",
    "icon": <FaGears />
  },
  {
    "id": 15,
    "title": "Timing Belt Replacement",
    "summary": "Importance and process of replacing the timing belt.",
    "content": "Guide on when and how to replace your car’s timing belt, signs that it may need replacing, and the potential consequences of not changing it on time.",
    "icon": <FaGears />
  },
  {
    "id": 16,
    "title": "Power Steering Fluid Check",
    "summary": "Maintain smooth steering with proper power steering fluid levels.",
    "content": "Instructions on how to check and top up power steering fluid, signs of power steering issues, and when to have the system inspected by a professional.",
    "icon": <FaGears />
  },
  {
    "id": 17,
    "title": "Exhaust System Inspection",
    "summary": "Ensure your exhaust system is functioning properly.",
    "content": "Guide on inspecting your exhaust system for leaks, rust, and damage, as well as understanding the impact of a faulty exhaust system on vehicle performance and emissions.",
    "icon": <FaGears />
  },
  {
    "id": 18,
    "title": "Battery Terminal Cleaning",
    "summary": "Keep your battery connections clean for optimal performance.",
    "content": "Steps for cleaning battery terminals and cables to prevent corrosion, improve battery life, and ensure reliable starts.",
    "icon": <FaGears />
  },
  {
    "id": 19,
    "title": "Cabin Air Filter Replacement",
    "summary": "Ensure clean air inside your vehicle.",
    "content": "Instructions for locating and replacing your cabin air filter to improve air quality and HVAC system efficiency.",
    "icon": <FaGears />
  },
  {
    "id": 20,
    "title": "Hoses and Belts Inspection",
    "summary": "Check for wear and tear on hoses and belts.",
    "content": "Guide on inspecting and replacing vehicle hoses and belts, including those for the cooling system, serpentine belt, and drive belts.",
    "icon": <FaGears />
  }
];

const Guide = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState(null);

  const openModal = (guide) => {
    setSelectedGuide(guide);
    onOpen();
  };

  const filteredGuides = search === null? guides: guides.filter(guide =>
    guide.title.toLowerCase().includes(search.toLowerCase()) ||
    guide.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading size="lg" mb="4">
          Car Guide Troubleshooting and Maintenance
        </Heading>
        <Box w='14rem'>
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
      <Box w='inherit' pb={10}>
        <Grid mt={5} templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={4}>
          {filteredGuides.map((guide) => (
            <Box
              p="4"
              h="13rem"
              bg="white"
              boxShadow='lg'
              key={guide.id}
              cursor="pointer"
              borderRadius="lg"
              overflow="hidden"
              transform="scale(1)"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
              onClick={() => openModal(guide)}
            >
              <Flex justifyContent='space-between' alignItems='center'>
                <Heading size="md" mb="2">{guide.title}</Heading>
                {guide.icon}
              </Flex>
              <Text fontSize={14} mt={5}>{guide.summary}</Text>
              <Text fontSize="14px" mt="2">{guide.content.slice(0, 100)}...</Text>
            </Box>
          ))}
        </Grid>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedGuide?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedGuide?.content}</Text>
            <Button
              mt="4"
              colorScheme="blue"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Guide;
