import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Symbol from "./components/Symbol/Symbol";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="page__content">
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/simbolos" element={<Main />} />
        <Route path="/simbolo" element={<Symbol />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
