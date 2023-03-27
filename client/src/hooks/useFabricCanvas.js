import React, { useRef, useCallback } from "react";
import { FabricContext } from "@/context/FabricContext";

import { fabric } from "fabric";
export const useFabricCanvas = () => {
  const canvas = React.useContext(FabricContext);
  const fabricRefCallBack = React.useCallback((element) => {
    if (!element) return canvas.current?.dispose();

    canvas.current = new fabric.Canvas(element, {
      backgroundColor: "#eee",
      isDrawingMode: true,
      width: element.parentNode.clientWidth,
      height: element.parentNode.clientHeight,
    });
    canvas.current.add(
      new fabric.Rect({
        top: 100,
        left: 100,
        width: 100,
        height: 100,
        fill: "red",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return fabricRefCallBack;
};
