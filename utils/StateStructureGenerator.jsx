import { useState } from "react";

/**
 * State Structure Generator
 *
 * @param {string[]} labels - An array of strings representing the labels for the form fields.
 * @returns {object} - An object representing the form state, containing state and handlers for each form field.
 */
const useStateStructureGenerator = (labels) => {
  const [formState, setFormState] = useState(
    labels.reduce((acc, label) => {
      const extractComponentLabel = label.includes("&")
        ? label.split("&")[0].split(".")[1]
        : label.split(".")[1];

      /**
       * Generate options state based on the label format
       *
       * @returns {object} - An object containing additional state properties based on the label
       */
      function optionState() {
        if (label.split(".")[0] === "s") {
          const extractOptions = label.split("&")[1];

          return {
            datas: JSON.parse(extractOptions),
            placeholder: `Select ${extractComponentLabel}`,
          };
        }

        return {
          type: label.toLowerCase().includes("password")
            ? "password"
            : label.includes("d.")
            ? "date"
            : "text",
          placeholder: `Enter ${extractComponentLabel}`,
          errorMessage: null,
          setErrorMessage: (error) =>
            handleErrorChange(extractComponentLabel, error),
        };
      }

      acc[extractComponentLabel] = {
        label: extractComponentLabel,
        value: "",
        setValue: (value) => handleValueChange(extractComponentLabel, value),
        ...optionState(),
      };

      return acc;
    }, {})
  );

  /**
   * Handle input change of form controller with 1 state
   *
   * @param {string} label - The label of the form field
   * @param {string} value - The new value of the form field
   */
  const handleValueChange = (label, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [label]: { ...prevState[label], value },
    }));
  };

  /**
   * Handle error change of form controller with 1 state
   *
   * @param {string} label - The label of the form field
   * @param {string} error - The new error message of the form field
   */
  const handleErrorChange = (label, error) => {
    setFormState((prevState) => ({
      ...prevState,
      [label]: { ...prevState[label], errorMessage: error },
    }));
  };

  return formState;
};

export default useStateStructureGenerator;
