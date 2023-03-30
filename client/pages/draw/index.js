import Canvas from "../../src/components/canvas";
import LeftPanel from "../../src/components/LeftPanel";
import Share from "../../src/components/Share";
import React, { useState } from "react";
import { RoomContext } from "@/context/RoomContext";

const Draw = () => {
  const [roomData, setRoomData] = useState([]);
  const [userData, setUserData] = useState([]);
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <LeftPanel />
      <RoomContext.Provider
        value={{ roomData, setRoomData, userData, setUserData }}
      >
        <Canvas />

        <div
          style={{
            top: 0,
            right: 0,
            display: "inline",
            position: "absolute",
            maxHeight: "4rem",
          }}
        >
          <Share />
        </div>
      </RoomContext.Provider>
    </div>
  );
};

export default Draw;
