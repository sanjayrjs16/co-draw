import React, { useContext, useEffect, useState } from "react";

import fabric from "fabric";
import { useFabricCanvas } from "@/hooks/useFabricCanvas";
import { FabricContext } from "@/context/FabricContext";
const Canvas = () => {
  const fabricRefCallBack = useFabricCanvas();
  const canvasRef = useContext(FabricContext);
  useEffect(() => {
    // Add event listener to window object to dynamically resize canvas
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const canvas = canvasRef.current;
    canvas.setDimensions({
      width: canvas.wrapperEl.parentNode.clientWidth,
      height: canvas.wrapperEl.parentNode.clientHeight,
    });

    canvas.renderAll();
  };
  return <canvas ref={fabricRefCallBack} id="2DCanvas" />;
};

export default Canvas;
