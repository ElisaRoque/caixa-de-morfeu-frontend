import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Popup from "./components/Popup/Popup";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About/About";
import MyDreams from "./components/MyDreams/MyDreams";
import Symbol from "./components/Symbol/Symbol";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound";

import { registerUser, loginUser, getCurrentUser } from "./utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );
  const [authModal, setAuthModal] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setCurrentUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const openAuthModal = (type) => {
    setAuthModal(type);
  };

  const closeAuthModal = () => {
    setAuthModal(null);
  };

  const handleLogin = (email, password) => {
    return loginUser({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);

        return getCurrentUser(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeAuthModal();
        navigate("/");
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        throw err;
      });
  };

  const handleRegister = (data) => {
    return registerUser(data)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };

  if (isLoading) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenAuthModal={openAuthModal}
        />

        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/simbolos" element={<Main />} />
          <Route
            path="/simbolo"
            element={
              <Symbol
                currentUser={currentUser}
                onOpenAuthModal={openAuthModal}
              />
            }
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/meus-sonhos"
            element={
              <ProtectedRoute>
                <MyDreams />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {authModal && (
          <Popup
            title={authModal === "login" ? "Entrar" : "Inscrever-se"}
            onClose={closeAuthModal}
          >
            {authModal === "login" ? (
              <Login
                handleLogin={handleLogin}
                onSwitchAuthModal={openAuthModal}
              />
            ) : (
              <Register
                onRegister={handleRegister}
                onSwitchAuthModal={openAuthModal}
              />
            )}
          </Popup>
        )}

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
