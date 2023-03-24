import Canvas from "@/components/canvas";
import LeftPanel from "@/components/LeftPanel";
import Share from "@/components/Share";
import React from "react";

const Draw = () => {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <LeftPanel />
      <Canvas />
      <Share />
    </div>
  );
};

export default Draw;
