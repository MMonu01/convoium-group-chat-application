import { useEffect } from "react";
import { connect } from "react-redux";
import { Avatar } from "@chakra-ui/react";

import MessagePrompt from "~/components/desktop/message-prompt";
import MessageHeader from "~/components/desktop/message-header";

const MessageContainer = (props) => {
  useEffect(() => {
    if (props.question !== "") {
      const textarea = document.getElementById("chat-box");
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [props.message_list[0], props.message_list.length]);

  return (
    <>
      <MessageHeader />
      <div className="h-screen w-full overflow-auto flex flex-col relative">
        <div id="chat-box" className="h-full flex flex-col bg-slate-100 overflow-auto p-4">
          {props.message_list.map((message, i) => {
            const is_present_user = message.user_email === props.email;
            return (
              <div key={i} className={`flex  ${is_present_user ? "flex-row-reverse" : "flex-row"} gap-2.5 mb-4`}>
                <Avatar name="User Image" h={9} w={9} src={message.user_avatar || props.avatar} />
                <div className="grid">
                  <h5 className={`text-md font-semibold leading-snug pb-1 ${is_present_user ? "text-end" : "text-start"}  capitalize`}>{message.username || "Stranger"}</h5>
                  <div className="w-max grid">
                    <div className={`px-2 rounded flex flex-col justify-start  ${is_present_user ? "text-end" : "text-start"} gap-3 inline-flex`}>
                      {message.messages.map((message_item, i) => {
                        return (
                          <h5 className={`text-sm text-gray-700 font-normal flex-col border-1 px-1 flex ${is_present_user ? "items-end" : "items-start"} leading-snug text-wrap`} style={{ maxWidth: "400px" }}>
                            <div>{message_item.message}</div>
                            <div className={`text-green-600 ${is_present_user ? "-mr-4" : "-ml-4"}`} style={{ fontSize: "8px" }}>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  avatar: state.login_store.avatar,
  email: state.login_store.email,
  username: state.login_store.username,
  room_list: state.chat_store.room_list,
  message_list: state.chat_store.message_list,
  current_room: state.chat_store.current_room,
  online_users: state.socket_store.online_users,
});
export default connect(mapStateToProps)(MessageContainer);
