"use client";

import InventoryNavBar from "./inventory_nav_bar";
import ProductCard from "./product_card";
import ModalComponent from "@components/ModalComponent";
import { Box, Flex, Image, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import useStateStructureGenerator from "@utils/StateStructureGenerator";
import StateStructureInputsComponents from "@utils/StateStructureInputsComponents";
import ButtonComponent from "@components/button";
import { productJsonData } from "./data";
import { useEffect, useState } from "react";
import FileUpload from "@components/Fileupload";
import useInventorHooks from "@hooks/inventoryhooks";

const Inventory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products, getInventory } = useInventorHooks();
  const [title, setTitle] = useState("New");
  const [profilePicture, setProfilePicture] = useState(null);
  const [activeButton, setActiveButton] = useState("Brand New");
  const [search, setSearch] = useState(null);
  const [files, setFiles] = useState([]);

  const labels = [
    "i.Name",
    "i.Description",
    "i.Year",
    "i.Model",
    "i.Type",
    "i.Price",
    "i.Quantity",
    "i.Overview",
    "a.Engine Options",
    "a.Transmissions",
    "a.Fuel Efficiency",
    "a.Interior",
    "a.Safety",
    "a.Comfort",
    "a.Design",
    "a.Performance",
  ];
  const formState = useStateStructureGenerator(labels);
  const stateStructureInputsComponent = new StateStructureInputsComponents(
    labels,
    formState,
    "16rem",
    null
  );

  function handleAddProduct() {}

  function handleCancel() {
    onClose();
  }

  function handleEdit() {
    onOpen();
    setTitle("Update");
  }

  const stockThreshold = 10;

  const filterProducts = (data, filterCriteria, stockThreshold) => {
    return data.filter((value) => {
      if (filterCriteria === "low stock") {
        return value.quantity < stockThreshold;
      } else if (
        filterCriteria === "brand new" ||
        filterCriteria === "second hand"
      ) {
        return value.category === "car" && value.type === filterCriteria;
      } else if (filterCriteria === "auto part") {
        return value.category === "auto part";
      }
      return false;
    });
  };

  const filteredData = filterProducts(
    products,
    activeButton.toLocaleLowerCase(),
    stockThreshold
  );

  const handleRemoveImage = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFetchInventory = (token) => {
    getInventory(token, (status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          break;
        default:
          console.log(feedback);
      }
    });
  };

  useEffect(() => {
    if (products.length === 0) {
      handleFetchInventory();
    }
  }, []);

  return (
    <>
      <InventoryNavBar
        search={search}
        setSearch={setSearch}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        openModal={onOpen}
      />
      <main>
        <div className="flex flex-wrap p-5">
          {filteredData
            .filter((value) =>
              search !== null
                ? value.name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                : value
            )
            .map((product, i) => (
              <ProductCard
                key={i}
                {...product}
                isInventoryDisplay={true}
                edit={handleEdit}
              />
            ))}
        </div>
      </main>
      <ModalComponent
        title="New Product"
        withCloseButton={true}
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        footer={
          <Flex gap={5}>
            <ButtonComponent w="6rem" label="Save" onClick={handleAddProduct} />
            <ButtonComponent
              w="6rem"
              label="Cancel"
              variant="secondary"
              onClick={handleCancel}
            />
          </Flex>
        }
      >
        <Wrap spacingX={10} spacingY={7} justifyItems="center">
          {
            /** Patient Personal Information */
            stateStructureInputsComponent.render("0.15")
          }
        </Wrap>
        {files.length === 0 ? null : (
          <Flex mt={10} gap={3}>
            {files.map((file, index) => (
              <Box
                key={index}
                mb={4}
                rounded={10}
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  maxH="100px"
                />
                <Text
                  position="absolute"
                  top="1px"
                  right="2px"
                  color="white"
                  px={2}
                  py={1}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </Text>
              </Box>
            ))}
          </Flex>
        )}
        {files.length === 0 && (
          <Box mt={5}>
            <FileUpload onFilesSelected={setFiles} />
          </Box>
        )}
      </ModalComponent>
    </>
  );
};

export default Inventory;
