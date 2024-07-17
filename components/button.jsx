import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const ButtonComponent = ({
  label,
  loadingLabel,
  icon,
  onClick,
  variant = "primary",
}) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => setLoading(!loading);

  const handleClick = () => {
    if (loadingLabel !== null) {
      onClick();
      return;
    }
    toggleLoading();
    onClick(() => toggleLoading());
  };

  return (
    <Button
      w="100%"
      bg={variant === "primary" ? "orange" : "gray.100"}
      isLoading={loadingLabel !== null ? loading : false}
      _hover={{ bg: variant === "primary" ? "orange.400" : "gray" }}
      leftIcon={icon}
      loadingText={loadingLabel}
      onClick={handleClick}
    >
      <Text>{label}</Text>
    </Button>
  );
};

export default ButtonComponent;
