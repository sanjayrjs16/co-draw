import Canvas from "@/components/canvas";
import LeftPanel from "@/components/LeftPanel";
import React from "react";

const Draw = () => {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <LeftPanel />
      <Canvas />
    </div>
  );
};

export default Draw;
