import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const ButtonComponent = ({
  label,
  loadingLabel,
  onClick,
  style,
  variant = "primary",
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const defaultStyle = {
    width: "100%",
    background: variant === "primary" ? "#f97316" : "#E2E8F0",
    color: variant === "primary" ? "white" : "black",
    _hover: { 
      background: variant === "primary" ? "#ea580c" : "#CBD5E0"
    },
    borderRadius: "6px",
    ...style
  };

  const handleClick = (e) => {
    if (loadingLabel) {
      setLoading(true);
      onClick(e, () => setLoading(false));
    } else {
      onClick(e);
    }
  };

  return (
    <Button
      isLoading={loading}
      loadingText={loadingLabel}
      onClick={handleClick}
      {...defaultStyle}
      {...props}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
