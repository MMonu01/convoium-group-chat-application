import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DarkMode, DrawerOverlay, DrawerContent, DrawerCloseButton, Avatar, Text, AvatarBadge } from "@chakra-ui/react";

import { GetUserLogout } from "~/actions/login-actions";

const OnlineUsersModal = ({ isOpen, onClose, ...props }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    props
      .Get_User_Logout()
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  };

  return (
    <>
      <DarkMode>
        <Drawer isOpen={isOpen} placement="right" size={"xs"} onClose={onClose} style={{ background: "black" }}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color="red" />
            <DrawerHeader color="white">Convoium</DrawerHeader>
            <DrawerBody className="flex flex-col gap-4">
              {props.online_users.map((user, i) => {
                return (
                  <div className="flex gap-4 items-center" key={i}>
                    <Avatar name="User Image" w={8} h={8} src={user.avatar || ""}>
                      <AvatarBadge boxSize=".9em" bg="green.500" />
                    </Avatar>
                    <Text color={"white"}>{user.username}</Text>
                  </div>
                );
              })}
            </DrawerBody>

            <DrawerFooter>
              <button type="button" onClick={onLogout} class="mb-2 block border border-red-600 w-full rounded bg-red-600 px-6 p-2 py-3 text-xs font-medium uppercase leading-normal text-white  hover:bg-primary-accent-300 hover:bg-red-700 active:bg-red-800">
                Logout
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DarkMode>
    </>
  );
};

const mapStateToProps = (state) => ({
  online_users: state.socket_store.online_users,
});
const mapDispatchToProps = (dispatch) => ({
  Get_User_Logout: () => dispatch(GetUserLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OnlineUsersModal);
