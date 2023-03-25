import React, { useContext, useEffect, useState } from "react";

import fabric from "fabric";
import { useFabricCanvas } from "@/hooks/useFabricCanvas";
import { FabricContext } from "@/context/FabricContext";
import {
  registerCanvasEvents,
  unRegisterCanvasEvents,
} from "@/utils/canvas/events";
import { RoomContext } from "@/context/RoomContext";
import { generateRandomColor } from "@/utils/generalFunctions";
import { socketConnection } from "@/utils/socket";
const randomColor = generateRandomColor();
const Canvas = () => {
  const fabricRefCallBack = useFabricCanvas();
  const canvasRef = useContext(FabricContext);
  const [cursorPositions, setCursorPositions] = useState({});
  const { roomData, userData } = useContext(RoomContext);

  useEffect(() => {
    // Add event listener to window object to dynamically resize canvas
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateCursorPositionSocketEvent = () => {
    const socket = socketConnection.getSocketFunctions();
    if (socket === null) return;
    socket.on("cursor-position-update", (data) => {
      const { id, cursor } = data;
      setCursorPositions((prevCursorPositions) => ({
        ...prevCursorPositions,
        [id]: cursor,
      }));
    });
  };
  useEffect(() => {
    if (canvasRef?.current) registerCanvasEvents(canvasRef, userData?.roomName);
    if (userData?.connectionStatus) updateCursorPositionSocketEvent();

    return () => {
      unRegisterCanvasEvents(canvasRef, userData?.roomName);
    };
  }, [userData]);

  const handleResize = () => {
    const canvas = canvasRef.current;
    canvas.setDimensions({
      width: canvas.wrapperEl.parentNode.clientWidth,
      height: canvas.wrapperEl.parentNode.clientHeight,
    });

    canvas.renderAll();
  };

  const renderLiveCursors = () => {
    // render the live cursor previews for each user in the room
    return Object.keys(cursorPositions).map((userId) => {
      const { x, y } = cursorPositions[userId];

      return (
        <div
          key={userId}
          id={userId}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 30,
            height: 30,
            borderRadius: "100%",
            textAlign: "center",
            display: "inline-block",
            lineHeight: 1.8,
            backgroundColor: randomColor,
            zIndex: 3,
          }}
        >
          {userData.userName.slice(0, 2)}
        </div>
      );
    });
  };

  return (
    <>
      <canvas ref={fabricRefCallBack} id="2DCanvas" />
      {renderLiveCursors()}
    </>
  );
};

export default Canvas;
