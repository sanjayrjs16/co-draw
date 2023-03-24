import Canvas from "../../src/components/canvas";
import LeftPanel from "../../src/components/LeftPanel";
import Share from "../../src/components/Share";
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
