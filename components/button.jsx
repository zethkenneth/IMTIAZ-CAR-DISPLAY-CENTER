import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const ButtonComponent = ({
  w = null,
  label,
  loadingLabel = null,
  icon,
  onClick,
  variant = "primary",
  style = {},
}) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => setLoading(!loading);

  const handleClick = (e) => {
    if (loadingLabel === null) {
      onClick(e);
      return;
    }
    toggleLoading();
    onClick(() => toggleLoading());
  };

  return (
    <Button
      w={w === null ? "100%" : w}
      size="sm"
      bg={variant === "primary" ? "orange" : "gray.100"}
      isLoading={loadingLabel !== null ? loading : false}
      _hover={{ bg: variant === "primary" ? "orange.400" : "gray" }}
      leftIcon={icon}
      loadingText={loadingLabel}
      onClick={handleClick}
      style={style}
    >
      <Text>{label}</Text>
    </Button>
  );
};

export default ButtonComponent;
