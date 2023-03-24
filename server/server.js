var app = require("express")();
var http = require("http").createServer(app);
const PORT = 5000;
var ss = require("socket.io-stream");

const host = {};
var io = require("socket.io")(PORT, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const STATIC_CHANNELS = ["global_notifications", "global_chat"];

// http.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`);
// });

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */

  socket.emit("connection", null);

  socket.on("create-room", function (room, name) {
    if (io.sockets.adapter.rooms.get(room)) {
      socket.emit(
        "error",
        "A room with this name already exists. Try another name"
      );
    } else {
      host.id = socket.id;
      host.name = name;
      socket.join(room);
      socket.emit("room-join-success", {
        message: `"Room creation successful!"`,
        room,
        name,
        id: socket.id,
        role: "HOST",
      });
    }
  });

  socket.on("join-room", function (room, name) {
    if (io.sockets.adapter.rooms.get(room)) {
      socket.join(room);
      io.to(room).emit("room-join-success", {
        message: `${name} just joined room !`,
        room,
        id: socket.id,
        name,
        role: "GUEST",
      });
      socket.to(host.id).emit("request-latest-canvas-and-room-data", socket.id);
    } else {
      socket.emit("error", "Room doesn't exist. Try again.");
      //   socket.disconnect();
    }
  });

  socket.on("send-canvas-room-data-to-new-joinee", function (data) {
    console.log("Recieved data from HOST", data.id);
    socket.to(data.id).emit("latest-room-canvas-data", data);
  });
  socket.on("leave-room", function (roomName, userName) {
    socket.leave(roomName);
    io.to(roomName).emit(
      "user-left",
      `${userName} has left the room !`,
      socket.id,
      userName
    );
  });

  socket.on("disconnecting", function () {
    console.log("Disconnecting firing, Left the room", socket.rooms);
  });

  ss(socket).on("send-canvas-to-new-joinee", function (stream, data) {
    var filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
  });

  socket.on("mouse_move", function (coords, roomName, id) {
    console.log(coords, id);
    // socket.broadcast.emit("mouse_position_update", data);
    socket.to(roomName).emit("mouse_position_update", { coords, roomName, id });
  });
});
