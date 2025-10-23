import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}
