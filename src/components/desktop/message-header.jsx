import { connect } from "react-redux";
import { Avatar, useDisclosure } from "@chakra-ui/react";

import OnlineUsersModal from "~/components/desktop/online-users-modal";

const MessageHeader = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const showUserList = () => {
    onOpen();
  };

  return (
    <>
      <div className="bg-white w-full flex justify-between items-center px-8" style={{ height: "70px" }}>
        <div className="flex gap-4">
          <Avatar name="Room Image" h={10} w={10} src="" />
          <div className="text-3xl font-semibold text-slate-700">{Object.hasOwn(props.current_room, "room_id") ? props.current_room.room_name : "Header"}</div>
        </div>
        <div onClick={showUserList} className="cursor-pointer">
          online {props.online_users.length}
        </div>{" "}
      </div>

      <OnlineUsersModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const mapStateToProps = (state) => ({
  current_room: state.chat_store.current_room,
  online_users: state.socket_store.online_users,
});
export default connect(mapStateToProps)(MessageHeader);
