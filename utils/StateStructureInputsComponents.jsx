import { Box, Flex, Textarea } from "@chakra-ui/react";
import FormController from "@components/FormController";
import SelectionComponent from "@components/SelectionComponent";
import TextAreaCustom from "@components/TextAreaCustom";

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
  constructor(labels, formState, width, flexProps) {
    this.labels = labels;
    this.formState = formState;
    this.width = width;
    this.flexProps = flexProps;
  }

  /**
   *
   * @param {string} strArr: Array of String for rendering different inputs
   * @returns {components} : return dislay of inputs
   */
  renderCollection(strArr) {
    /**
     * Inputs components without container
     */
    if (this.flexProps === null) {
      return strArr.map((str) => this.render(str));
    }

    /**
     * Inputs components with wrap flex container
     */
    return strArr.map((str) => this.wrapWithFlex(this.render(str)));
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

    return (
      <>
        {Array.from({ length: end - start + 1 }, (_, k) => k + start).map(
          (i) => {
            const label = this.labels[i];
            const componentLabel = label.includes("&")
              ? label.split("&")[0].split(".")[1]
              : label.split(".")[1];

            if (this.labels[i].split(".")[0] === "s") {
              return (
                <Box key={i} w={this.width} h="60px">
                  <SelectionComponent
                    {...this.formState[componentLabel]}
                    isRequired={true}
                  />
                </Box>
              );
            }

            if (this.labels[i].split(".")[0] === "a") {
              return (
                <Box key={i} w={this.width}>
                  <TextAreaCustom {...this.formState[componentLabel]} />
                </Box>
              );
            }

            return (
              <Box key={i} w={this.width} h="60px">
                <FormController {...this.formState[componentLabel]} />
              </Box>
            );
          }
        )}
      </>
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
  wrapWithFlex(child) {
    return <Flex {...this.flexProps}>{child}</Flex>;
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

    Object.keys(this.formState).forEach((key) => {
      const keyData = key.includes("Guardian") ? key.split(" ")[1] : key;
      const formKey = keyData.toLowerCase().replace(/\s+/g, "_");

      if (formKey === "sex" || formKey === "civil_status") {
        formData.append(
          formKey,
          this.formState[key].datas[this.formState[key].value].name
        );
        return;
      }

      const isForeignKey =
        this.formState[key].placeholder.includes("Select") &&
        /^\d+$/.test(this.formState[key].value);

      if (isForeignKey)
        return formData.append(`${formKey}_id`, this.formState[key].value);

      formData.append(formKey, this.formState[key].value);
    });

    return formData;
  }

  reset() {
    this.formState.map((state) => (state.value = null));
  }
}

export default StateStructureInputsComponents;
