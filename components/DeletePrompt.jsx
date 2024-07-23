"use client"

import { Flex, HStack, PinInput, PinInputField, Text } from "@chakra-ui/react";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "./button";
import { useState } from "react";



const DeletePrompt = ({isOpen, onClose, handleSubmit, handleCancel, children}) => {
    const [pin, setPin] = useState(["", "", "", "", "", ""]);
        
    const handlePinChange = (index, value) => {
        const newPinValues = [...pin];
        newPinValues[index] = value;
        setPin(newPinValues);
    };

    function submit(stopLoading) {
        handleSubmit(pin.join(""), (status) => {
        if (!status) {
            stopLoading();
            return;
        }
        onClose();
        stopLoading();
        });
    }


    return (
        <ModalComponent
            title="Delete Product"
            withCloseButton={true}
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            footer={
                <Flex gap={5}>
                <ButtonComponent w="6rem" label="Save" onClick={submit} />
                <ButtonComponent
                    w="6rem"
                    label="Cancel"
                    variant="secondary"
                    onClick={handleCancel}
                />
                </Flex>
            }
        >
            {children}
            <Text mt={5} fontSize={12}>
                {`Please provide an authorization pin in order to proceed deletion of this record.`}
            </Text>
            <Text mt={2} fontSize={13} fontWeight={600}>{"Authorization Pin".toLocaleUpperCase()}</Text>
            <HStack mt={2} display="flex" justifyContent="space-between" size="lg">
                <PinInput focusBorderColor="teal" >
                    {pin.map((value, index) => (
                    <PinInputField
                        key={index}
                        value={value}
                        onChange={(e) => handlePinChange(index, e.target.value)}
                    />
                    ))}
                </PinInput>
            </HStack>
        </ModalComponent>
    );
}

export default DeletePrompt