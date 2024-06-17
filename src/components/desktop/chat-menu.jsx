import { useRef, useState } from "react";
import { connect } from "react-redux";
import { Avatar } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import Sidebar from "~/components/desktop/sidebar";
import ChatList from "~/components/desktop/chat-list";

import { GetRoomData } from "~/actions/chat-actions";

const ChatMenu = ({ isOpen, onOpen, onClose, ...props }) => {
  const btnRef = useRef();
  const [search_room, setSearchRoom] = useState("");

  const searchRoom = () => {
    props.Get_Room_Data(search_room);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchRoom();
    }
  };

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <div className=" sticky top-0 bg-black z-10 border-b">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className="flex gap-4 text-md font-semibold items-center">
            <Avatar name="User Image" src={props.avatar} />
            <div>{props.username}</div>
          </div>

          <div ref={btnRef} onClick={onOpen} className="cursor-pointer p-y-2">
            <HamburgerIcon w={6} h={6} />
          </div>
        </div>

        <div className="p-4 border-gray-400">
          <div className="relative">
            <input
              id="search-rooms"
              type="text"
              value={search_room}
              onChange={(e) => setSearchRoom(e.target.value)}
              onKeyUp={handleKeyDown}
              className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Search group..."
              rows="1"
              required
            />
            <button type="button" onClick={searchRoom} className="absolute bottom-2 right-2.5 rounded-lg p-1.5 bg-black text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 9h8"></path>
                <path d="M8 13h5"></path>
                <path d="M11.008 19.195l-3.008 1.805v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"></path>
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M20.2 20.2l1.8 1.8"></path>
              </svg>
              <span className="sr-only">Search chats</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {props.room_list.map((room, i) => {
          return <ChatList key={i} room={room} />;
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  avatar: state.login_store.avatar,
  username: state.login_store.username,
  room_list: state.chat_store.room_list,
});
const mapDispatchToProps = (dispatch) => ({
  Get_Room_Data: (search_room) => dispatch(GetRoomData(search_room)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatMenu);
