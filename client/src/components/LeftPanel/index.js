import React, { useContext, useState } from "react";
import { VStack, Box, Button, Flex } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FabricContext } from "@/context/FabricContext";
const LeftPanel = () => {
  const canvasRef = useContext(FabricContext);
  const [selectedTool, setSelectedTool] = useState();
  return (
    <>
      {" "}
      <Flex flexDirection={"column"} position={"absolute"} zIndex={2}>
        <Button
          // as="span"
          flex="1"
          textAlign="left"
          background={"blackAlpha.800"}
          color={"white"}
        >
          <HamburgerIcon />
        </Button>
        <VStack bg={"wheat"} padding={4}>
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
      </Flex>
    </>
  );
};
export default LeftPanel;
