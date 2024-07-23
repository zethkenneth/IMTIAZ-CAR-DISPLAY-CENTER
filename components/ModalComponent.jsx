import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const ModalComponent = ({
  title,
  initialRef,
  isOpen,
  onClose,
  children,
  footer,
  size = "lg",
  progress,
  withCloseButton = false,
}) => {
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent rounded={12} overflow={"hidden"}>
        {progress}
        <ModalHeader color="orange" fontSize={isSmallerThan500 ? 15 : 20}>
          {title}
        </ModalHeader>
        {withCloseButton ? (
          <ModalCloseButton _hover={{ bg: "transparent" }} />
        ) : null}
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  initialRef: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.object,
  footer: PropTypes.object,
  size: PropTypes.string,
  progress: PropTypes.object,
  withCloseButton: PropTypes.false,
};

export default ModalComponent;
