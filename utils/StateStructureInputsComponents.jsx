import { Box, Flex } from "@chakra-ui/react";
import FormController from "@components/FormController";
import SelectionComponent from "@components/SelectionComponent";
import TextAreaComponent from "@components/TextAreaComponent";

//Icon
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

/**
 * State Structure Inputs Component
 *
 * function class for managing render component of State Structure Generator Instance
 *
 * @param {string[]} labels: Optional array of string
 * @param {object} formState: instance of StateStructureInputs
 * @param {string} width: Optional  specific width of inputs
 * @param {object} flexProps: css object for style of containers
 *
 * @return {function} : Instanceof StateStructureInputsComponents
 */
class StateStructureInputsComponents {
  constructor(
    labels,
    formState,
    width,
    flexProps,
    withIcons,
    children,
    insertAt
  ) {
    this.labels = labels;
    this.formState = formState;
    this.width = width;
    this.flexProps = flexProps;
    this.withIcons = withIcons;
    this.children = children;
    this.insertAt = insertAt;
  }

  /**
   *
   * @param {string} label Label of the input component
   * @returns {icon} : return icon base on label
   */
  renderIcon(label) {
    if (label.toLowerCase().includes("name")) {
      return <FaUserAlt color="teal" size={15} />;
    }

    if (label.toLowerCase().includes("password")) {
      return <FaLock color="teal" size={15} />;
    }

    if (label.toLowerCase().includes("email")) {
      return <MdEmail color="teal" size={15} />;
    }
  }

  /**
   *
   * @param {string} strArr: Array of String for rendering different inputs
   * @returns {components} : return display of inputs
   */
  renderCollection(strArr) {
    /**
     * Inputs components without container
     */
    if (this.flexProps === null) {
      return strArr.map((str) => this.render(str));
    }

    if (this.children !== null && this.children !== undefined) {
      let components = strArr.map((str) => this.render(str));

      // Insert children starting at index 7
      const beforeInsert = components.slice(0, this.insertAt);
      const afterInsert = components.slice(this.insertAt);
      this.children = this.children.map((child, i = components.length) =>
        this.componentContainer(child, i)
      );

      // Function to split array into subarrays of size 2
      const groupIntoPairs = (arr) => {
        let result = [];
        for (let i = 0; i < arr.length; i += 2) {
          result.push(arr.slice(i, i + 2)); // Push subarray of 2 items (or 1 if it's the last odd one)
        }
        return result;
      };

      // Convert the children into an array of arrays with pairs of 2 items
      this.children = groupIntoPairs(this.children);

      components = [...beforeInsert, ...this.children, ...afterInsert];

      /**
       * Inputs components with wrap flex container
       */
      return components.map((child, index) => this.wrapWithFlex(child, index));
    }

    /**
     * Inputs components with wrap flex container
     */
    return strArr.map((str, index) =>
      this.wrapWithFlex(this.render(str), index)
    );
  }

  componentContainer(child, i) {
    return (
      <Box key={i} w={this.width} h="60px">
        {child}
      </Box>
    );
  }

  /**
   *
   * @param {string} str : A string that specify start and end index divided by decimal ex. "0.3"
   * @returns {components} : list of inputs of components
   */
  render(str) {
    const [startIndex, endIndex] = str.split(".");
    const start = parseInt(startIndex, 10);
    const end = parseInt(endIndex, 10);

    return Array.from({ length: end - start + 1 }, (_, k) => k + start).map(
      (i) => {
        const label = this.labels[i];
        const componentLabel = label.includes("&")
          ? label.split("&")[0].split(".")[1]
          : label.split(".")[1];

        if (this.labels[i].split(".")[0] === "s") {
          return this.componentContainer(
            <SelectionComponent {...this.formState[componentLabel]} />
          );
        }

        if (this.labels[i].split(".")[0] === "a") {
          return (
            <Box key={i} w={this.width}>
              <TextAreaComponent
                {...this.formState[componentLabel]}
                fontSize={12}
              />
            </Box>
          );
        }

        if (this.withIcons) {
          return this.componentContainer(
            <FormController {...this.formState[componentLabel]}>
              {this.renderIcon(componentLabel)}
            </FormController>
          );
        }

        return this.componentContainer(
          <FormController {...this.formState[componentLabel]} />
        );
      }
    );
  }

  /**
   * wrapWithFlex
   *
   * Add a container for input component for responsive purpose
   *
   * @param {component} child : Input components to be wrap by the flex
   * @returns {component} : Inputs that is wrap in the flex
   */
  wrapWithFlex(child, index) {
    return (
      <Flex key={index} {...this.flexProps}>
        {child}
      </Flex>
    );
  }

  /**
   * Retrieve Form Data From From State
   *
   * Base on form state given this function will generate a form data and using the key of form state it
   * it will be us key of form data on append.
   *
   * @returns {formData}: form data for data gathered from user
   */
  retrieveFormDataFromFormState() {
    let formData = new FormData();

    Object.keys(this.formState).forEach((key, index) => {
      const formKey = key.toLowerCase().replace(/\s+/g, "_");

      /**
       * Retrieve the value of selected option
       */
      if (
        this.labels[index].includes("&") &&
        !this.labels[index].includes("#")
      ) {
        return formData.append(
          formKey,
          this.formState[key].datas[this.formState[key].value].name
        );
      }

      formData.append(formKey, this.formState[key].value);
    });

    return formData;
  }

  /**
   * Reset all form states to their initial values
   */
  resetFormState() {
    Object.keys(this.formState).forEach((key) => {
      this.formState[key].value = ""; // or you can set this to any default value
    });
  }

  /**
   * Populate Form With Data
   *
   * @param {array} dataArray : Data parameters that will be use to populate the component
   *
   * @returns {null}
   */
  populateFormWithData(dataArray) {
    // Check if the length of dataArray matches the number of labels
    // This ensures that each label has a corresponding value
    if (dataArray.length !== this.labels.length) {
      console.error("Data array length does not match labels length.");
      return;
    }

    /**
     * Populate the form state with list of value pass
     */
    Object.keys(this.formState).forEach((key, index) => {
      if (this.labels[index].includes("&")) {
        /**
         * Set the value for selection base
         */
        return (this.formState[key].value = dataArray[index]);
      }

      return (this.formState[key].value = dataArray[index]); // or you can set this to any default value
    });
  }
}

export default StateStructureInputsComponents;
