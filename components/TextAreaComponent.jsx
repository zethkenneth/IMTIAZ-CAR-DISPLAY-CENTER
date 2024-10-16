import { Box, Text, Textarea } from "@chakra-ui/react";
import PropTypes from "prop-types";

/**
 *
 * @param {string} label
 * label of the textarea
 *
 * @param {string} placeholder
 * description of text area to inform the user what the text area value expect
 *
 * @param {string} value
 * the variable that will hold the value of the user input
 *
 * @param {function} setValue
 * function that will insert the user input to the state
 *
 * @returns {component}
 */
const TextAreaComponent = ({ label, placeholder, value, setValue, mt }) => {
  return (
    <>
      <Text mb="8px" fontSize={12}>
        {label}
      </Text>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        focusBorderColor={"gray.400"}
        bg="white"
        size="sm"
        resize="none"
        rounded={5}
      />
    </>
  );
};

TextAreaComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default TextAreaComponent;
