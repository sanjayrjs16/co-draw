import React from "react";
import { VStack, Box } from "@chakra-ui/react";
const LeftPanel = () => {
  return (
    <VStack position={"absolute"} zIndex={2} bg={"wheat"} padding={4}>
      <Box bg={"white"} textAlign={"center"} pd={8}>
        Brush
      </Box>
      <Box bg={"white"} textAlign={"center"} pd={2}>
        Eraser
      </Box>
      <Box bg={"white"} textAlign={"center"} pd={8}>
        Select
      </Box>
      <Box bg={"white"} textAlign={"center"} pd={8}>
        Zoom
      </Box>
    </VStack>
  );
};

export default LeftPanel;
