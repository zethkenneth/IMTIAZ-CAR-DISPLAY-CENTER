"use client";

import InventoryNavBar from "./inventory_nav_bar";
import ProductCard from "./product_card";
import ModalComponent from "@components/ModalComponent";
import { Box, Flex, useDisclosure, Wrap } from "@chakra-ui/react";
import useStateStructureGenerator from "@utils/StateStructureGenerator";
import StateStructureInputsComponents from "@utils/StateStructureInputsComponents";
import DraggableProfilePictureUpload from "@components/DraggableProfilePictureUpload";
import ButtonComponent from "@components/button";
import { productJsonData } from "./data";
import { useState } from "react";

const Inventory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("New");
  const [profilePicture, setProfilePicture] = useState(null);
  const [activeButton, setActiveButton] = useState("Brand New");
  const [search, setSearch] = useState(null)

  const labels = [
    "i.Name",
    "i.Description",
    "i.Year",
    "i.Model",
    "i.Type",
    "i.Price",
    "i.Quantity",
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
      } else if (filterCriteria === "brand new" || filterCriteria === "second hand") {
        return value.category === "car" && value.type === filterCriteria;
      } else if (filterCriteria === "auto part") {
        return value.category === "auto part";
      }
      return false;
    });
  };

  const filteredData = filterProducts(productJsonData, activeButton.toLocaleLowerCase(), stockThreshold);

  return (
    <>
      <InventoryNavBar search={search} setSearch={setSearch} activeButton={activeButton} setActiveButton={setActiveButton} openModal={onOpen} />
      <main>
        <div className="flex flex-wrap p-5">
          { filteredData 
            .filter((value) => search !== null? value.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()): value)
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
        size="2xl"
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
            stateStructureInputsComponent.render("0.6")
          }
        </Wrap>
        <Box mt={5}>
            <DraggableProfilePictureUpload
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
            />
        </Box>
      </ModalComponent>
    </>
  );
};

export default Inventory;
