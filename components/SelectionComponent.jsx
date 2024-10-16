import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SelectionComponent = ({
  label,
  placeholder,
  datas,
  value,
  setValue,
  isRequired,
}) => {
  if (!Array.isArray(datas[0])) {
    return (
      <FormControl isRequired={isRequired ?? false}>
        <FormLabel fontSize={12}>{label}</FormLabel>
        <Select
          fontSize={12}
          focusBorderColor={"gray.400"}
          placeholder={label === "" ? placeholder : `Select ${label}`}
          color="gray.500"
          bg={"white"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          required
        >
          {datas.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <FormControl isRequired={isRequired ?? false}>
      <FormLabel fontSize={12}>label</FormLabel>
      <Select
        fontSize={14}
        focusBorderColor={"gray.400"}
        placeholder={label === "" ? placeholder : `Select ${label}`}
        bg={"gray.100"}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        required
      >
        {datas.map((data, index) => (
          <option key={index}> {data}</option>
        ))}
      </Select>
    </FormControl>
  );
};

SelectionComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  datas: PropTypes.array,
  value: PropTypes.string,
  setValue: PropTypes.func,
  isRequired: PropTypes.bool,
};

export default SelectionComponent;
