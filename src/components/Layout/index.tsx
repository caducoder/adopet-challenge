import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;