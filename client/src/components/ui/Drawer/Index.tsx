import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
} from "@chakra-ui/react";
import React from "react";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    placement : any,
    header : string,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerComponent: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    children,
    setOpen,
    header,
    placement = 'right',
}) => {
    return (
        <Drawer isOpen={isOpen} placement={placement} onClose={onClose} onOverlayClick={() => setOpen(false)}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton onClick={() => setOpen(false)}/>
                <DrawerHeader>{header}</DrawerHeader>

                <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerComponent;
