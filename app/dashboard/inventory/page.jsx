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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import ButtonComponent from "@components/button";
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
import { useToast } from "@chakra-ui/react";

const Inventory = () => {
  const { isOpen, onOpen, onClose: chakraOnClose } = useDisclosure();
  const { products = [], getInventory, storeProduct, updateProduct } = useInventorHooks();
  const [title, setTitle] = useState("New");
  const [activeButton, setActiveButton] = useState("Brand New");
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    year: '',
    model: '',
    type: '',
    price: '',
    quantityOnHand: '',
    overview: '',
    engine_options: '',
    transmissions: '',
    fuel_efficiency: '',
    interior: '',
    safety: '',
    comfort: '',
    design: '',
    performance: '',
    brand: '',
    category: '',
    chasis: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for price field
    if (name === 'price') {
      const numValue = parseFloat(value);
      if (numValue > 99999999.99) {
        return; // Don't update if value is too large
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    // Function to fetch inventory
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const result = await getInventory();
        if (result.status !== 200) {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch on mount
    fetchInventory();

    // Add event listeners for page visibility and focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchInventory();
      }
    };

    const handleFocus = () => {
      fetchInventory();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Cleanup listeners
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [getInventory]);

  const handleSaveProduct = async () => {
    try {
      const form = new FormData();
      
      // Append all product info
      form.append('productName', formData.productName || '');
      form.append('description', formData.description || '');
      form.append('year', formData.year || '');
      form.append('model', formData.model || '');
      form.append('brand', formData.brand || '');
      form.append('type', formData.type || '');
      form.append('category', formData.category || '');
      form.append('price', formData.price || '');
      form.append('quantityOnHand', formData.quantityOnHand || '');
      form.append('chasis', formData.chasis || '');

      // Append description2 as JSON
      const description2 = {
        overview: formData.overview || '',
        engine_options: formData.engine_options || '',
        transmissions: formData.transmissions || '',
        fuel_efficiency: formData.fuel_efficiency || '',
        interior: formData.interior || '',
        safety: formData.safety || '',
        comfort: formData.comfort || '',
        design: formData.design || '',
        performance: formData.performance || '',
      };
      form.append('description2', JSON.stringify(description2));

      // Handle existing images
      const existingImages = files
        .filter(file => file.isExisting)
        .map(file => file.url);
      form.append('existingImages', JSON.stringify(existingImages));

      // Add file validation before upload
      const newFiles = files.filter(file => !file.isExisting);
      if (newFiles.length > 0) {
        // Check file sizes and types
        const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB (Dropbox's default max file size)
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
        
        for (const file of newFiles) {
          if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File ${file.name} is too large. Maximum size is 150MB.`);
          }
          if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error(`File ${file.name} is not a supported image type. Please use JPG, PNG, or GIF.`);
          }
        }
        
        newFiles.forEach((file) => {
          form.append('attachments[]', file);
        });
      }

      let result;
      if (editingProductId) {
        result = await updateProduct(editingProductId, form);
      } else {
        result = await storeProduct(form);
      }

      if (result.status >= 200 && result.status < 300) {
        await getInventory(); // Refresh the product list
        onClose();
        toast({
          title: "Success",
          description: result.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to save product",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save product. Please check your file uploads and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Custom onClose handler that calls handleCancel
  const onClose = () => {
    handleCancel();
    chakraOnClose();
  };

  function handleCancel() {
    setTitle("New");
    setEditingProductId(null);
    setFormData({
      productName: '',
      description: '',
      year: '',
      model: '',
      type: '',
      price: '',
      // quantityOnHand: '',
      overview: '',
      engine_options: '',
      transmissions: '',
      fuel_efficiency: '',
      interior: '',
      safety: '',
      comfort: '',
      design: '',
      performance: '',
      brand: '',
      category: '',
      reorderLevel: '',
      chasis: ''
    });
    setFiles([]);
  }

  function handleEdit(product) {
    onOpen();
    setTitle("Update");
    setEditingProductId(product.id || product.productID);
    
    try {
      const desc2 = typeof product.description2 === 'string' ? 
        JSON.parse(product.description2) : 
        product.description2 || {};

      // Convert existing image URLs to File objects if they exist
      if (product.imageUrl && Array.isArray(product.imageUrl)) {
        // Store the existing image URLs
        setFiles(product.imageUrl.map(url => ({
          name: url.split('/').pop(),
          url: url,
          isExisting: true // Flag to identify existing images
        })));
      }

      setFormData({
        productName: product.productName || '',
        description: product.description || '',
        year: product.year || '',
        model: product.model || '',
        type: product.type || '',
        price: product.price?.toString() || '',
        quantityOnHand: product.quantityOnHand?.toString() || '',
        overview: desc2?.overview || '',
        engine_options: desc2?.engine_options || '',
        transmissions: desc2?.transmissions || '',
        fuel_efficiency: desc2?.fuel_efficiency || '',
        interior: desc2?.interior || '',
        safety: desc2?.safety || '',
        comfort: desc2?.comfort || '',
        design: desc2?.design || '',
        performance: desc2?.performance || '',
        brand: product.brand || '',
        category: product.category || '',
        reorderLevel: product.reorderLevel?.toString() || '',
        chasis: product.chasis || ''
      });
    } catch (error) {
      console.error('Error parsing description2:', error);
    }
  }

  const stockThreshold = 10;

  const filterProducts = (data, filterCriteria, stockThreshold) => {
    if (!data || !Array.isArray(data)) return [];
    
    // If no filter criteria matches, return all products
    if (!filterCriteria) return data;

    const criteria = filterCriteria.toLowerCase();
    
    return data.filter((value) => {
      if (criteria === "low stock") {
        return parseInt(value.quantityOnHand) < stockThreshold;
      } else if (criteria === "brand new" || criteria === "second hand") {
        return value.type?.toLowerCase() === criteria;
      } else if (criteria === "auto part") {
        return value.category?.toLowerCase() === "auto part";
      }
      return true; // Show all products if no filter matches
    });
  };

  const filteredData = filterProducts(
    products,
    activeButton.toLowerCase(),
    stockThreshold
  );

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(prevFiles => [
      ...prevFiles.filter(file => file.isExisting), // Keep existing files
      ...newFiles // Add new files
    ]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(indexToRemove, 1);
      return newFiles;
    });
  };

  const toast = useToast();

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
          {isLoading ? (
            <Flex justify="center" align="center" h="200px">
              <Spinner size="xl" color="orange.500" />
            </Flex>
          ) : (
            <div className="flex flex-wrap p-5 gap-5">
              {filteredData.length === 0 ? (
                <Text>No products found</Text>
              ) : (
                filteredData
                  .filter((value) => 
                    search === "" || 
                    value.productName?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((product, i) => (
                    <ProductCard
                      key={i}
                      name={product.productName}
                      {...product}
                      isInventoryDisplay={true}
                      edit={() => handleEdit(product)}
                    />
                  ))
              )}
            </div>
          )}
        </main>
        <ModalComponent
          title={`${title} Product`}
          withCloseButton={true}
          isOpen={isOpen}
          onClose={onClose}
          size="5xl"
          footer={
            <Flex gap={5}>
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
                onClick={() => document.getElementById("fileInput").click()}
              />
              <ButtonComponent
                w="6rem"
                label="Save"
                onClick={handleSaveProduct}
              />
              <ButtonComponent
                w="6rem"
                label="Cancel"
                variant="secondary"
                onClick={onClose}
              />
            </Flex>
          }
        >
          <Box h="500" overflow="scroll">
            <Text>
              Please provide the required details. This information will be useful later when managing your product listings and inventory.
            </Text>
            <Box pl={5} pr={5}>
              <Flex direction="column" gap={4} mt={5}>
                {/* Basic Information */}
                <FormControl>
                  <FormLabel fontSize={12}>Product Name</FormLabel>
                  <Input
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <Flex gap={4}>
                  <FormControl>
                    <FormLabel fontSize={12}>Year</FormLabel>
                    <Input
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      fontSize={13}
                      bg="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize={12}>Model</FormLabel>
                    <Input
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      fontSize={13}
                      bg="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize={12}>Brand</FormLabel>
                    <Input
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      fontSize={13}
                      bg="white"
                    />
                  </FormControl>
                </Flex>

                <Flex gap={4}>
                  <FormControl>
                    <FormLabel fontSize={12}>Type</FormLabel>
                    <Input
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      fontSize={13}
                      bg="white"
                      placeholder="e.g., Brand New, Second Hand"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize={12}>Category</FormLabel>
                    <Input
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      fontSize={13}
                      bg="white"
                      placeholder="e.g., Auto Part, Vehicle"
                    />
                  </FormControl>
                </Flex>

                <Flex gap={4}>
                  <FormControl>
                    <FormLabel fontSize={12}>Price</FormLabel>
                    <Input
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      type="number"
                      max="99999999.99"
                      step="0.01"
                      fontSize={13}
                      bg="white"
                    />
                  </FormControl>

                  {/* <FormControl>
                    <FormLabel fontSize={12}>Quantity</FormLabel>
                    <Input
                      name="quantityOnHand"
                      value={formData.quantityOnHand}
                      onChange={handleInputChange}
                      type="number"
                      fontSize={13}
                      bg="white"
                    />
                  </FormControl> */}

                  <FormControl>
                    <FormLabel fontSize={12}>Chasis</FormLabel>
                    <Input
                      name="chasis"
                      value={formData.chasis}
                      onChange={handleInputChange}
                      type="text"
                      fontSize={13}
                      bg="white"
                    />
                  </FormControl>
                </Flex>

                {/* Additional Information */}
                <FormControl>
                  <FormLabel fontSize={12}>Overview</FormLabel>
                  <Textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Engine Options</FormLabel>
                  <Textarea
                    name="engine_options"
                    value={formData.engine_options}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Transmissions</FormLabel>
                  <Textarea
                    name="transmissions"
                    value={formData.transmissions}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Fuel Efficiency</FormLabel>
                  <Textarea
                    name="fuel_efficiency"
                    value={formData.fuel_efficiency}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Interior</FormLabel>
                  <Textarea
                    name="interior"
                    value={formData.interior}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Safety</FormLabel>
                  <Textarea
                    name="safety"
                    value={formData.safety}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Comfort</FormLabel>
                  <Textarea
                    name="comfort"
                    value={formData.comfort}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Design</FormLabel>
                  <Textarea
                    name="design"
                    value={formData.design}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={12}>Performance</FormLabel>
                  <Textarea
                    name="performance"
                    value={formData.performance}
                    onChange={handleInputChange}
                    fontSize={13}
                    bg="white"
                  />
                </FormControl>
              </Flex>
            </Box>

            <Wrap mt={5}>
              {files.map((file, index) => (
                <WrapItem key={index} p={2} position="relative" overflow="hidden">
                  <Box
                    p={2}
                    w="100px"
                    h="100px"
                    bg="blackAlpha.400"
                    rounded={5}
                    overflow="hidden"
                    position="relative"
                  >
                    {file.isExisting ? (
                      <Image src={file.url} alt="Product" objectFit="cover" w="100%" h="100%" />
                    ) : (
                      file.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <Image 
                          src={URL.createObjectURL(file)} 
                          alt="Preview" 
                          objectFit="cover" 
                          w="100%" 
                          h="100%" 
                        />
                      ) : (
                        <Box>
                          {file.name.includes("pdf") ? (
                            <FaFilePdf size={20} />
                          ) : file.name.includes("xlsx") || file.name.includes("xls") ? (
                            <FaFileExcel size={20} />
                          ) : file.name.includes("pptx") ? (
                            <FaFilePowerpoint size={20} />
                          ) : (
                            <FaFileWord size={20} />
                          )}
                        </Box>
                      )
                    )}
                    <IconButton
                      icon={<CloseIcon />}
                      size="xs"
                      position="absolute"
                      top={1}
                      right={1}
                      onClick={() => handleRemoveFile(index)}
                    />
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </ModalComponent>
      </>
    </PageContainer>
  );
};

export default Inventory;
