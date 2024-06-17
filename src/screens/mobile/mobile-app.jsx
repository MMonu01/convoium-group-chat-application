import { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MobileRoute from "~/routes/mobile-routes";

import { StartupGetInitialData } from "~/actions/startup-actions";

function MobileApp(props) {
  useEffect(() => {
    props.Startup_Get_Initial_Data();
  }, []);

  return (
    <>
      <MobileRoute />
      <ToastContainer position="bottom-center" autoClose={3000} closeOnClick={false} />
    </>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket_store.socket,
});
const mapDispatchToProps = (dispatch) => ({
  Startup_Get_Initial_Data: () => dispatch(StartupGetInitialData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
