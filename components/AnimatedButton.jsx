import { Button, useMediaQuery } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * @param {string} label
 * label of button
 *
 * @param {boolean} disable
 * to dissable the button
 *
 * @param {function} onClick
 * action to be triggered when user click the button
 *
 * @param {component} icon
 * icon that is related to what the purpose of the button, nullable
 *
 * @param {string} variant
 * to display 2 types of button
 * ex. primary default value where the background is primary color
 *
 * @param {string} actionType
 * action type refers to the type of trasaction such as add, update and delete
 * this display different background color per type
 *
 * @param {string} loadingLabel
 * label will be displayed when transaction is on process,
 * null loadingLable means the button doesn't support loading display
 * ex. saving. deleting.
 *
 * @param {integer} rounded
 * border radius of a button
 *
 * @param {object} _hover
 * additional css style that can be use for hover interaction of user
 *
 * @param {integer} w
 * the width of the button optional
 *
 * @param {string} size
 * optional size allow to modify the button size rather using default value
 *
 * @returns {component}
 */
const AnimatedButton = ({
  label,
  disable = false,
  onClick,
  icon = null,
  variant = "primary",
  actionType = "post",
  loadingLabel = null,
  rounded = 20,
  _hover = null,
  w = null,
  size = null,
  fontSize = 12,
}) => {
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
  const [loading, setLoading] = useState();

  const colorTypeBaseOnAction =
    actionType === "post"
      ? "darkorange"
      : actionType === "put"
      ? "darkorange"
      : "red";

  function styleValue() {
    switch (variant) {
      case "primary":
        return {
          color: "white",
          bg: disable === true ? "gray.200" : colorTypeBaseOnAction,
          fontWeight: 400,
          boxShadow: "lg",
        };
      case "secondary":
        return {
          color: disable === true ? "gray.200" : "black",
          bg: "lightgray",
          fontWeight: 400,
          boxShadow: "lg",
        };
      case "other":
        return {
          color: "black",
          bg: "white",
          fontWeight: 400,
        };
    }
  }

  function triggerProcess() {
    setLoading(true);
    onClick(() => setLoading(false));
  }

  return (
    <Button
      w={w}
      leftIcon={icon}
      disabled={disable}
      size={size !== null ? size : "sm"}
      fontSize={fontSize}
      isLoading={loadingLabel && loading}
      loadingText={loadingLabel}
      _hover={_hover}
      rounded={rounded}
      onClick={() => triggerProcess()}
      {...styleValue()}
    >
      {label}
    </Button>
  );
};

AnimatedButton.propTypes = {
  label: PropTypes.string,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.object,
  variant: PropTypes.string,
  actionType: PropTypes.string,
  loadingLabel: PropTypes.string,
  rounded: PropTypes.any,
  _hover: PropTypes.object,
  w: PropTypes.any,
  size: PropTypes.string,
};

export default AnimatedButton;
