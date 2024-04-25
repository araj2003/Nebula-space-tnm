import { ScrollRestoration, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer,Zoom } from "react-toastify";
import Footer from "./components/Footer";
import TabsSidebar from "./components/RQF/TabsSidebar";

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <TabsSidebar />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        transition={Zoom}
      />
      <Footer />
    </>
  );
};

export default Layout;
