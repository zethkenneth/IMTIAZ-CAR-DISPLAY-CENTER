import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const InputComponent = ({
  icon,
  name,
  label,
  placeholder,
  value,
  setValue,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <FormControl>
        <InputGroup>
          {icon && <InputLeftElement>{icon}</InputLeftElement>}
          <Input
            label={label}
            placeholder={placeholder}
            type={name !== "password" ? "text" : show ? "text" : "password"}
            focusBorderColor="orange.200"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {name.includes("password") && (
            <InputRightElement>
              <IconButton
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                icon={
                  show ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )
                }
                onClick={() => setShow(!show)}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    </>
  );
};

export default InputComponent;
