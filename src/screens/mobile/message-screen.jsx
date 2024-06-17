import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";

import MessagePrompt from "~/components/mobile/message-prompt";
import MessageHeader from "~/components/mobile/message-header";

import { StartSocketConnection, SocketJoinRoom } from "~/actions/socket-actions";

const MessageScreen = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.socket_id) {
      props.Start_Socket_Connection();
    }
  }, []);

  useEffect(() => {
    if (!!props.socket_id) {
      props.Socket_Join_Room();
    }
  }, [props.socket_id]);

  useEffect(() => {
    if (props.question !== "") {
      const textarea = document.getElementById("chat-box");
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [props.message_list[0], props.message_list.length]);

  const goToChat = () => {
    navigate("/chat");
  };

  if (Object.keys(props.current_room).length === 0) {
    goToChat();
  }

  return (
    <div className="fixed text-white bg-zinc-900 w-screen flex flex-col items-center justify-center">
      <MessageHeader />
      <div className="h-screen w-full overflow-auto flex flex-col relative">
        <div id="chat-box" className="h-full flex flex-col bg-zinc-800 overflow-auto p-4" style={{ paddingBottom: "220px" }}>
          {props.message_list.map((message, i) => {
            const is_present_user = message.user_email === props.email;
            return (
              <div key={i} className={`flex  ${is_present_user ? "flex-row-reverse" : "flex-row"} gap-2.5 mb-4`}>
                <Avatar name="User Image" h={9} w={9} src={message.user_avatar || props.avatar} />
                <div className="grid">
                  <h5 className={`text-sm text-slate-200 font-semibold leading-snug pb-1 ${is_present_user ? "text-end" : "text-start"}  capitalize`}>{message.username || "Stranger"}</h5>
                  <div className="w-max grid">
                    <div className={`px-2 rounded flex flex-col justify-start  ${is_present_user ? "items-end" : "items-start"} gap-3 inline-flex`}>
                      {message.messages.map((message_item, i) => {
                        return (
                          <h5 className={`text-slate-300 text-sm font-normal flex-col border-1 px-1 flex ${is_present_user ? "items-end" : "items-start"} leading-snug text-wrap`} style={{ maxWidth: "250px" }}>
                            <div className="text-wrap">{message_item.message}</div>
                            <div className={`text-green-200 ${is_present_user ? "-mr-4" : "-ml-4"}`} style={{ fontSize: "8px" }}>
                              {message_item.date}
                            </div>
                          </h5>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <MessagePrompt />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.login_store.email,
  avatar: state.login_store.avatar,
  username: state.login_store.username,
  room_list: state.chat_store.room_list,
  socket_id: state.socket_store.socket_id,
  message_list: state.chat_store.message_list,
  current_room: state.chat_store.current_room,
  online_users: state.socket_store.online_users,
});
const mapDispatchToProps = (dispatch) => ({
  Socket_Join_Room: () => dispatch(SocketJoinRoom()),
  Start_Socket_Connection: () => dispatch(StartSocketConnection()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);
