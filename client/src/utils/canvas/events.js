import { socketConnection } from "../socket";
export const unRegisterCanvasEvents = (canvasRef, staticCanvasRef) => {
  const canvas = canvasRef.current;
  for (const key in canvas?.__eventListeners) {
    if (key !== "after:render") {
      canvas.__eventListeners[key] = [];
    }
  }
};
const registerSocketUpdateCursorEvent = (roomName, x, y) => {
  const socket = socketConnection.getSocketFunctions();
  if (socket === null) return;
  socket.emit("updateCursorPosition", {
    roomName,
    cursor: { x, y },
  });
};
export const registerCanvasEvents = (canvasRef, roomName = null) => {
  const canvas = canvasRef?.current;
  canvas.on("mouse:down", function (opt) {
    // only fire this if socket is connected and is part of the room
  });
  canvas.on("mouse:move", function (opt) {
    const pointer = canvas.getPointer(opt.e);
    const x = pointer.x;
    const y = pointer.y;
    if (this.isDragging) {
      var e = opt.e;
      var vpt = this.viewportTransform;
      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
    if (roomName) {
      registerSocketUpdateCursorEvent(roomName, x, y);
    }
  });
  canvas.on("mouse:up", function (opt) {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform

    this.setViewportTransform(this.viewportTransform);
    this.isDragging = false;
    this.selection = true;
  });
  canvas.on("mouse:wheel", function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
};
