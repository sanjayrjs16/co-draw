import React, { useContext, useState } from "react";
import { HStack, Box, Button, Flex, Icon } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FabricContext } from "@/context/FabricContext";
import {
  MdPanTool,
  MdTextFields,
  MdOutlineRectangle,
  MdOutlineCircle,
} from "react-icons/md";
import { BsEraserFill, BsImage, BsBrush } from "react-icons/bs";
import { FaShapes, FaMousePointer } from "react-icons/fa";
const LeftPanel = () => {
  const canvasRef = useContext(FabricContext);
  const [selectedTool, setSelectedTool] = useState();
  return (
    <>
      {" "}
      <Flex flexDirection={"row"} position={"absolute"} zIndex={2}>
        <HStack bg={"white"} padding={4} boxShadow={"lg"} borderRadius={"lg"}>
          <Box
            title="Pan tool"
            bg={"white"}
            textAlign={"center"}
            pd={8}
            onClick={() => {
              canvasRef.current.isDrawingMode = false;
              canvasRef.current.isPanning = true;
              canvasRef.current.forEachObject(function (obj) {
                obj.selectable = false;
              });
            }}
          >
            <Icon as={MdPanTool} w={8} h={8} />
          </Box>
          <Box bg={"white"} textAlign={"center"} pd={8}>
            <Icon as={FaMousePointer} w={8} h={8} />
          </Box>
          <Button
            bg={"white"}
            textAlign={"center"}
            pd={8}
            onClick={() => {
              canvasRef.current.isDrawingMode = true;
              canvasRef.current.isPanning = false;
              canvasRef.current.forEachObject(function (obj) {
                obj.selectable = true;
              });
            }}
          >
            <Icon as={BsBrush} w={8} h={8} />
          </Button>
          <Box bg={"white"} textAlign={"center"} pd={8}>
            <Icon as={BsEraserFill} w={8} h={8} />
          </Box>
          <Box bg={"white"} textAlign={"center"} pd={8}>
            <Icon as={BsImage} w={8} h={8} />
          </Box>
          <Box bg={"white"} textAlign={"center"} pd={8}>
            <Icon as={FaShapes} w={8} h={8} />
          </Box>
          <Box bg={"white"} textAlign={"center"} pd={8}>
            <Icon as={MdTextFields} w={8} h={8} />
          </Box>
        </HStack>
      </Flex>
    </>
  );
};
export default LeftPanel;
