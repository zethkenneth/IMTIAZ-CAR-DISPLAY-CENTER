import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const PaymentMethodSelect = ({ value, onChange }) => {
  return (
    <FormControl>
      <FormLabel>Payment Method</FormLabel>
      <Select 
        value={value} 
        onChange={onChange}
        bg="white"
      >
        <option value="ONLINE">Online Payment</option>
        <option value="CASH">Cash Payment</option>
      </Select>
    </FormControl>
  );
};

export default PaymentMethodSelect;