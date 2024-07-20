"use client";

import InventoryNavBar from "./inventory_nav_bar";
import ProductCard from "./product_card";
import { carJsonData } from "./data";
import ModalComponent from "@components/ModalComponent";
import { Flex, useDisclosure, Wrap } from "@chakra-ui/react";
import useStateStructureGenerator from "@utils/StateStructureGenerator";
import StateStructureInputsComponents from "@utils/StateStructureInputsComponents";
import ButtonComponent from "@components/button";
import { useState } from "react";

const Inventory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("New");

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

  return (
    <>
      <InventoryNavBar openModal={onOpen} />
      <main>
        <div className="flex flex-wrap p-5">
          {carJsonData.map((product, i) => (
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
      </ModalComponent>
    </>
  );
};

export default Inventory;
