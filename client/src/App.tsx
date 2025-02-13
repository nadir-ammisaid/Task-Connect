import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main id="mainOfApp">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
