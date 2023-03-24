import React from "react";
import { VStack, Box } from "@chakra-ui/react";
const LeftPanel = () => {
  return (
    <VStack position={"absolute"} zIndex={2} bg={"wheat"} padding={20}>
      <Box bg={"white"} textAlign={"center"} pd={20}>
        Brush
      </Box>
      <Box bg={"white"} textAlign={"center"} pd={20}>
        Eraser
      </Box>
      <Box bg={"white"} textAlign={"center"} pd={20}>
        Select
      </Box>
      <Box bg={"white"} textAlign={"center"} pd={20}>
        Zoom
      </Box>
    </VStack>
  );
};

export default LeftPanel;
