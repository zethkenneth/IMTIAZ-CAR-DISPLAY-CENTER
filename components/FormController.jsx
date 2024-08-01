import { useState } from "react";
import {
  Input,
  FormLabel,
  InputGroup,
  FormControl,
  FormErrorMessage,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import "../styles/App.css";
import PropTypes from "prop-types";

/**
 *
 * @param {label} string
 * display label on top of input component nullable
 *
 * @param {placeholder} string
 * description inside input component nullable
 *
 * @param {type} string
 * input type ex. email, text, password, etc..
 *
 * @param {value} any
 * value that the user input
 *
 * @param {setValue} function
 * function that will store the value that the user type
 *
 * @param {errorMessage} string
 * error message to be display upon validating the input
 *
 * @param {setErrorMessage} function
 * function that will store the error message in state
 *
 * @param {children} component
 * icon component to be rendered nullable
 *
 * @param {mt} number
 * margin top this will allow for modification to meet vertical space between inputs
 *
 * @param {isRequired} boolean
 * specified if input if cannot be empty
 *
 * @returns {component}
 */
const FormController = ({
  label = null,
  type,
  placeholder,
  value,
  setValue,
  errorMessage,
  setErrorMessage,
  children = null,
  isRequired,
  mt = 0,
  rounded = null
}) => {
  const [show, setShow] = useState(false);

  const onChange = (e) => {
    e.preventDefault();

    if (type === "password" && e.target.value.includes(" ")) {
      return;
    }

    setValue(e.target.value);

    if (errorMessage !== null) {
      setErrorMessage(null);
    }
  };

  return (
    <>
      <FormControl
        marginTop={mt}
        isInvalid={errorMessage !== null}
        isRequired={isRequired}
      >
        {label && (
          <FormLabel fontSize={"12"} fontWeight="500" color={"#272727"}>
            {label}
          </FormLabel>
        )}
        <InputGroup>
          {children && (
            <InputLeftElement pointerEvents="none">{children}</InputLeftElement>
          )}
          <Input
            onPaste={(e) => (type === "password" ? e.preventDefault() : null)}
            type={type !== "password" ? type : show ? "text" : type}
            value={value}
            placeholder={placeholder}
            fontSize={13}
            bg="white"
            boxShadow="sm"
            autoComplete="new-password"
            focusBorderColor={"rgba(0, 128, 128,0.5)"}
            rounded={rounded !== null ? rounded : null}
            onChange={(e) => onChange(e)}
          />
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </>
  );
};

FormController.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
  children: PropTypes.object,
  isRequired: PropTypes.bool,
  mt: PropTypes.number,
  rounded: PropTypes.any,
};

export default FormController;
