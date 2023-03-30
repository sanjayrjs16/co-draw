import { socketConnection } from "../socket";
export const ADD_EVENT = "OBJECT_ADD";
export const MODIFY_EVENT = "OBJECT_MODIFY";
export const REMOVE_EVENT = "OBJECT_REMOVE";

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

const registerSocketUpdateObjectEvent = (type, roomName, object) => {
  const socket = socketConnection.getSocketFunctions();
  if (socket === null) return;
  switch (type) {
    case ADD_EVENT: {
      console.log("emitting to server", roomName);
      socket.emit(ADD_EVENT, { roomName, object, userId: socket.id });
      break;
    }
    case MODIFY_EVENT: {
      socket.emit(MODIFY_EVENT, { roomName, object });
      break;
    }
    case REMOVE_EVENT: {
      socket.emit(REMOVE_EVENT, { roomName, object });
      break;
    }
    default: {
      break;
    }
  }
};

export const handleObjectAdded = (e, roomName) => {
  // Broadcast the added object to other members in the room
  if (roomName) {
    registerSocketUpdateObjectEvent(ADD_EVENT, roomName, e.target.toObject());
  }
};

export const registerCanvasEvents = (canvasRef, roomName = null) => {
  const canvas = canvasRef?.current;
  const handleAdd = (e) => {
    handleObjectAdded(e, roomName);
  };
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
  // Listen for object added, modified, and removed events on the canvas
  canvas.on("object:added", handleAdd);
  // socketRef.current.emit('object:added', { roomId, object: e.target.toJSON() });

  canvas.on("object:modified", (e) => {
    // Broadcast the modified object to other members in the room
    if (roomName) {
      registerSocketUpdateObjectEvent(
        MODIFY_EVENT,
        roomName,
        e.target.toObject()
      );
    }
    // socketRef.current.emit('object:modified', { roomId, object: e.target.toJSON() });
  });

  canvas.on("object:removed", (e) => {
    // Broadcast the removed object to other members in the room
    if (roomName) {
      registerSocketUpdateObjectEvent(
        REMOVE_EVENT,
        roomName,
        e.target.toJSON()
      );
    }
    // socketRef.current.emit('object:removed', { roomId, objectId: e.target.id });
  });
};
