import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, useDisclosure } from "@chakra-ui/react";

import OnlineUsersModal from "~/components/mobile/online-users-modal";

const MessageHeader = (props) => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const goToChat = () => {
    navigate("/chat");
  };

  const showUserList = () => {
    onOpen();
  };

  return (
    <>
      <div className="p-4 bg-black w-full pb-2 flex flex-row justify-between items-center">
        <div className="flex gap-2 text-md font-semibold items-center">
          <Avatar name="User Image" w={10} h={10} src={""} />
          <div className="text-xl">{Object.hasOwn(props.current_room, "room_id") ? props.current_room.room_name : "Header"}</div>
        </div>

        <div onClick={() => {}} className="h-full flex items-center gap-4 cursor-pointer p-y-2">
          <Badge onClick={goToChat} border={2} px={1} style={{ border: "1px solid gray" }}>
            groups
          </Badge>
          <Badge onClick={showUserList} border={2} px={1} style={{ border: "1px solid gray" }}>
            online : {props.online_users.length}
          </Badge>
        </div>
      </div>
      <OnlineUsersModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const mapStateToProps = (state) => ({
  current_room: state.chat_store.current_room,
  online_users: state.socket_store.online_users,
});
const mapDispatchToProps = (dispatch) => ({
  Socket_Join_Room: () => dispatch(SocketJoinRoom()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessageHeader);
