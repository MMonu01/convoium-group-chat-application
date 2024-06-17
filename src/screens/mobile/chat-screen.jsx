import { useEffect } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";

import ChatMenu from "~/components/mobile/chat-menu";

import { GetRoomData } from "~/actions/chat-actions";
import { StartSocketConnection } from "~/actions/socket-actions";

const ChatScreen = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.logged_in_success) {
      props.Start_Socket_Connection();
      props.Get_Room_Data();
    }
  }, [props.logged_in_success]);

  return (
    <div className="h-screen bg-zinc-800 flex ">
      <div className="bg-zinc-900 text-white overflow-auto" style={{ width: "100%" }}>
        <ChatMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  room_list: state.chat_store.room_list,
  logged_in_success: state.login_store.logged_in_success,
});
const mapDispatchToProps = (dispatch) => ({
  Get_Room_Data: () => dispatch(GetRoomData()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
