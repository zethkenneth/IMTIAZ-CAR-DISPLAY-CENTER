"use client";

import InventoryNavBar from "./inventory_nav_bar";
import ProductCard from "./product_card";
import ModalComponent from "@components/ModalComponent";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import useStateStructureGenerator from "@utils/StateStructureGenerator";
import StateStructureInputsComponents from "@utils/StateStructureInputsComponents";
import ButtonComponent from "@components/button";
import { productJsonData } from "./data";
import { useEffect, useState } from "react";
import FileUpload from "@components/Fileupload";
import useInventorHooks from "@hooks/inventoryhooks";
import AnimatedButton from "@components/AnimatedButton";
import { CloseIcon } from "@chakra-ui/icons";
import {
  FaFileExcel,
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
} from "react-icons/fa";
import PageContainer from "@components/PageContainer";

const Inventory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products, getInventory, storeProduct } = useInventorHooks();
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
    "a.Overview",
    "a.Engine Options",
    "a.Transmissions",
    "a.Fuel Efficiency",
    "a.Interior",
    "a.Safety",
    "a.Comfort",
    "a.Design",
    "a.Performance",
  ];
  const indexToRender = ["0.3", "4.6"];
  const indexToRender2 = [
    "7.7",
    "8.8",
    "9.9",
    "10.10",
    "11.11",
    "12.12",
    "13.13",
    "14.14",
  ];

  const formState = useStateStructureGenerator(labels);
  const stateStructureInputsComponent = new StateStructureInputsComponents(
    labels,
    formState,
    "100%",
    { gap: 5, mt: 5 }
  );

  function handleAddProduct() {
    let form = stateStructureInputsComponent.retrieveFormDataFromFormState();

    files.forEach((file) => {
      form.append("attachments[]", file);
    });

    storeProduct(form, (status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        return console.log(feedback);
      }

      return console.log(feedback);
    });
  }

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
    products ?? [],
    activeButton.toLocaleLowerCase(),
    stockThreshold
  );

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleRemoveFile = (indexToRemove) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
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
                  name={product.productName}
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
          size="5xl"
          footer={
            <Flex gap={5}>
              <>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <AnimatedButton
                  label="Upload Attachment"
                  variant="secondary"
                  rounded={7}
                  // onClick={() => document.getElementById("fileInput").click()}
                />
              </>
              <ButtonComponent
                w="6rem"
                label="Save"
                onClick={handleAddProduct}
              />
              <ButtonComponent
                w="6rem"
                label="Cancel"
                variant="secondary"
                onClick={handleCancel}
              />
            </Flex>
          }
        >
          <Box h="500" overflow="scroll">
            <Text>
              {
                "Please provide the required details. This information will be useful later when managing your product listings and inventory."
              }
            </Text>
            <Box pl={5} pr={5}>
              {
                /** Patient Personal Information */
                stateStructureInputsComponent.renderCollection(indexToRender)
              }
              {
                /** Patient Personal Information */
                stateStructureInputsComponent.renderCollection(indexToRender2)
              }
            </Box>
            <Wrap mt={5}>
              {files.map((file, index) => {
                if (
                  !file.name.includes("jpeg") &&
                  !file.name.includes("png") &&
                  !file.name.includes("jpg")
                ) {
                  return (
                    <WrapItem
                      key={index}
                      p={2}
                      position="relative"
                      overflow="hidden"
                    >
                      <Box
                        p={2}
                        w="100px"
                        h="100px"
                        bg="blackAlpha.400"
                        rounded={5}
                        overflow="hidden"
                      >
                        {file.name.includes("pdf") ? (
                          <FaFilePdf size={20} />
                        ) : file.name.includes("xlsx") ||
                          file.name.includes("xls") ? (
                          <FaFileExcel size={20} />
                        ) : file.name.includes("pptx") ? (
                          <FaFilePowerpoint size={20} />
                        ) : (
                          <FaFileWord size={20} />
                        )}
                        <Text mt={2} fontSize={12}>
                          {file.name}
                        </Text>
                      </Box>
                      <IconButton
                        icon={<CloseIcon />}
                        fontSize={12}
                        colorScheme="transparent"
                        color="white"
                        position="absolute"
                        top="2px"
                        right="2px"
                        onClick={() => handleRemoveFile(index)}
                      />
                    </WrapItem>
                  );
                }

                return (
                  <WrapItem
                    key={index}
                    p={2}
                    position="relative"
                    overflow="hidden"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      rounded={5}
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      fontSize={12}
                      colorScheme="transparent"
                      color="white"
                      position="absolute"
                      top="2px"
                      right="2px"
                      onClick={() => handleRemoveFile(index)}
                    />
                  </WrapItem>
                );
              })}
            </Wrap>
          </Box>
        </ModalComponent>
      </>
    </PageContainer>
  );
};

export default Inventory;
