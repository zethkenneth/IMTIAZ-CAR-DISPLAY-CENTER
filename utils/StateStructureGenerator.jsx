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
          const extractOptions = label.includes("#")
            ? label.split("&")[1].split("#")[0]
            : label.split("&")[1];

          let initialObj = {
            placeholder: `Select ${extractComponentLabel}`,
            isRequired: label.includes("#required"),
          };

          if (extractOptions.includes("library")) {
            const options = extractOptions.split("-");

            let datas = [];
            switch (options[1]) {
              case "departments":
                datas = departmentSummary;
                break;
              case "hospitals":
                datas = hospitalListSummaryDetails;
                break;
              case "positions":
                datas = positionsSummary;
                break;
              case "specializations":
                datas = specializationSummaryList;
            }

            return {
              ...initialObj,
              datas: datas,
            };
          }

          return {
            ...initialObj,
            datas: JSON.parse(extractOptions),
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
          isRequired: label.includes("&") && label.includes("i."),
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

  /**
   * Validate input values
   *
   * @param {string} value - The value of the form field
   * @param {string} label - The label of the form field
   * @returns {string|null} - The error message if validation fails, or null if it passes
   */
  const validateInput = (value, label) => {
    if (!value && formState[label].isRequired) {
      return `${label} is required`;
    }

    // Add more custom validation logic here if needed
    // Example: Check if email is valid
    if (label.toLowerCase().includes("email") && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    // Example: Password validation
    if (label.toLowerCase().includes("password") && value) {
      if (value.length < 6) {
        return "Password must be at least 6 characters long";
      }
    }

    return null;
  };

  return formState;
};

export default useStateStructureGenerator;
