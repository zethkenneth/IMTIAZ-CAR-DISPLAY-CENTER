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
  withGradientColor = false
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

  if(withGradientColor){
    return (
      <Button
        w={w === null ? "100%" : w}
        size="sm"
        bgGradient={variant === "primary" ? "linear(to-r, orange.400, orange.500, orange.600)" : "gray.100"}
        bg={variant !== "primary" ? "gray.100" : undefined} // Fallback bg color
        isLoading={loadingLabel !== null ? loading : false}
        _hover={{
          bgGradient: variant === "primary" ? "linear(to-r, orange.500, orange.600, orange.700)" : "gray.200",
          bg: variant !== "primary" ? "gray.200" : undefined // Fallback bg color
        }}
        leftIcon={icon}
        loadingText={loadingLabel}
        onClick={handleClick}
        style={style}
        color="white"
      >
        <Text>{label}</Text>
      </Button>
    );
  }

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
