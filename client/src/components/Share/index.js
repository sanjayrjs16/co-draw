import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverHeader,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  ButtonGroup,
  Portal,
} from "@chakra-ui/react";
import React from "react";

const Share = () => {
  const triggerRef = React.useRef();
  return (
    <Popover placement="left">
      <PopoverTrigger>
        {/* <Box> */}
        <Button
          colorScheme="teal"
          size="lg"
          variant="solid"
          ref={triggerRef}
          style={{
            top: 0,
            right: 0,
            display: "inline",
            position: "absolute",
          }}
        >
          Share
        </Button>
        {/* </Box> */}
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Share;
