import { Textarea } from "@chakra-ui/react";

const TextAreaCustom = ({
  placeholder,
  value,
  setValue,
  isRequired,
  mt = 0,
  rounded = null,
}) => {
  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      isRequired={isRequired}
      mt={mt}
      rounded={rounded}
      resize="none"
    />
  );
};

export default TextAreaCustom;
