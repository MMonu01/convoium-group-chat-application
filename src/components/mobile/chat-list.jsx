import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Text, useDisclosure } from "@chakra-ui/react";

import RoomModal from "~/components/mobile/room-modal";

import { SetCurrentRoom } from "~/actions/chat-actions";
import { SocketJoinRoom } from "~/actions/socket-actions";

const ChatMenu = ({ room, ...props }) => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getCurrentRoomData = (room) => {
    props.Set_Current_Room(room);
    props.Socket_Join_Room();
    navigate("/message");
  };

  const showRoomModal = () => {
    onOpen();
  };

  return (
    <>
      <div className={`w-full p-4 hover:bg-black cursor-pointer flex gap-3 items-center ${props.current_room.room_id === room.room_id ? "bg-black" : ""}`}>
        <div>
          <Avatar name="User Image" h={9} w={9} src={"https://bit.ly/broken-link"} />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center gap-2">
            <Text noOfLines={1} onClick={() => getCurrentRoomData(room)} style={{ cursor: "pointer" }}>
              {room.room_name.length > 10 ? <>{room.room_name.slice(0, 15)}...</> : room.room_name}
            </Text>
            <div onClick={showRoomModal} className="px-4 cursor-pointer">
              :
            </div>
          </div>
          <div onClick={() => getCurrentRoomData(room)} className="text-sm text-gray-400 cursor-pointer">
            {room.preview}
          </div>
        </div>
      </div>

      <RoomModal isOpen={isOpen} onClose={onClose} room={room} />
    </>
  );
};

const mapStateToProps = (state) => ({
  current_room: state.chat_store.current_room,
});
const mapDispatchToProps = (dispatch) => ({
  Socket_Join_Room: () => dispatch(SocketJoinRoom()),
  Set_Current_Room: (room) => dispatch(SetCurrentRoom(room)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatMenu);
