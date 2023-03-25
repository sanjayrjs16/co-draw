import { RoomContext } from "@/context/RoomContext";
import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverHeader,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  ButtonGroup,
  Portal,
  Input,
} from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import CustomModal from "../modal";
import { socketConnection } from "@/utils/socket";
import { useToast } from "@chakra-ui/react";
import { FabricContext } from "@/context/FabricContext";
import { generateCanvasJSON } from "@/utils/canvas/functions";

const CreateRoom = ({
  showCreateRoom,
  setShowCreateRoom,
  requestConnection,
  setRequestConnection,
}) => {
  const [userName, setuserName] = useState("");
  const [roomName, setroomName] = useState("");
  const { roomData, setRoomData, setUserData } = useContext(RoomContext);
  return (
    <CustomModal
      isOpen={showCreateRoom}
      onClose={() => setShowCreateRoom(false)}
      title={"Create room"}
      desc={""}
      proceedAction={() => {
        setRequestConnection(true);
        setUserData({
          userName,
          type: "HOST",
          roomName,
          connectionStatus: false,
        });

        setShowCreateRoom(false);
      }}
      isProceedDisabled={userName.length <= 0 && roomName.length <= 0}
    >
      <>
        <Input
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        <Input
          placeholder="Enter a room name"
          value={roomName}
          onChange={(e) => setroomName(e.target.value)}
        />
      </>
    </CustomModal>
  );
};
const JoinRoom = ({
  showJoinRoom,
  setShowJoinRoom,
  requestConnection,
  setRequestConnection,
}) => {
  const [roomName, setroomName] = useState("");
  const [userName, setuserName] = useState("");
  const { roomData, setRoomData, setUserData } = useContext(RoomContext);
  return (
    <CustomModal
      isOpen={showJoinRoom}
      onClose={() => setShowJoinRoom(false)}
      title={"Join room"}
      desc={""}
      proceedAction={() => {
        setRequestConnection(true);
        setUserData({
          userName,
          type: "GUEST",
          roomName,
          connectionStatus: false,
        });
        setShowJoinRoom(false);
      }}
      isProceedDisabled={userName.length <= 0 && roomName.length <= 0}
    >
      <>
        <Input
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        <Input
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setroomName(e.target.value)}
        />
      </>
    </CustomModal>
  );
};

const Share = () => {
  const triggerRef = React.useRef();
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [requestConnection, setRequestConnection] = useState(false);

  const { userData, setUserData, setRoomData, roomData } =
    useContext(RoomContext);
  const canvasRef = useContext(FabricContext);
  const toast = useToast();
  useEffect(() => {
    if (requestConnection) {
      establishConnection();
    }
  }, [requestConnection]);

  const establishConnection = () => {
    socketConnection.initializeSocket("http://localhost:5000");
    const socket = socketConnection.getSocketFunctions();
    if (socket === null) return;

    socket.on("connect", () => {
      if (userData?.type === "HOST") {
        socket.emit("create-room", userData?.roomName, userData?.userName);
      } else {
        socket.emit("join-room", userData?.roomName, userData?.userName);
      }
    });

    socket.on("room-join-success", (data) => {
      const { message, room: roomName, id, name: userName, role: type } = data;
      if (socket.id === id) {
        setUserData((prevData) => ({
          ...prevData,
          connectionStatus: true,
          socketId: socket.id,
        }));
        setRoomData((prevRoomData) => [
          ...prevRoomData,
          { userName, type, roomName },
        ]);
        toast({
          title: `You joined room ${roomName}!`,
          status: "success",
          isClosable: true,
          position: "top",
        });
      } else {
        // everyone else
        let newRoomData;
        setRoomData((prevRoomData) => {
          newRoomData = [...prevRoomData, { userName, type, roomName }];
          return newRoomData;
        });

        toast({
          title: message,
          status: "success",
          isClosable: true,
          position: "top",
        });
        socket.on("request-latest-canvas-and-room-data", function (id) {
          console.log("host sending room data", roomData);
          socket.emit("send-canvas-room-data-to-new-joinee", {
            canvas: generateCanvasJSON(canvasRef.current),
            roomData: newRoomData,
            id,
          });
        });
      }
    });

    socket.on("latest-room-canvas-data", function (data) {
      const { roomData, id } = data;
      canvasRef?.current?.loadFromJSON(
        data.canvas,
        function () {
          canvasRef?.current?.renderAll();
        },
        function (o, object) {
          console.log(o, object);
        }
      );
      setRoomData(roomData);
    });
  };
  return (
    <>
      {userData?.connectionStatus ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          Connected
          <Button variant={"solid"}>Disconnect</Button>
          {roomData.map((member) => {
            return (
              <div>
                {member?.userName}
                {member?.type === "HOST" ? "(HOST)" : ""}
              </div>
            );
          })}
        </div>
      ) : (
        <Popover placement="left">
          <PopoverTrigger>
            {/* <Box> */}
            <Button
              colorScheme="teal"
              size="lg"
              variant="solid"
              ref={triggerRef}
            >
              Share
            </Button>
            {/* </Box> */}
          </PopoverTrigger>

          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />

            <PopoverBody>
              <ButtonGroup>
                <Button onClick={() => setShowCreateRoom(true)}>
                  Create a room
                </Button>
                <Button onClick={() => setShowJoinRoom(true)}>
                  Join a room
                </Button>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
      {showJoinRoom && (
        <JoinRoom
          showJoinRoom={showJoinRoom}
          setShowJoinRoom={setShowJoinRoom}
          requestConnection={requestConnection}
          setRequestConnection={setRequestConnection}
        />
      )}
      {showCreateRoom && (
        <CreateRoom
          showCreateRoom={showCreateRoom}
          setShowCreateRoom={setShowCreateRoom}
          requestConnection={requestConnection}
          setRequestConnection={setRequestConnection}
        />
      )}
    </>
  );
};

export default Share;
