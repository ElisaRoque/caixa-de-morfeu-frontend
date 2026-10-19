import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "/cmlogo.png";

function Header({ currentUser, onLogout, onOpenAuthModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleLinkClick() {
    setIsMenuOpen(false);
  }

  function handleLoginClick() {
    setIsMenuOpen(false);
    onOpenAuthModal("login");
  }

  function handleLogoutClick() {
    setIsMenuOpen(false);
    onLogout();
  }

  return (
    <header className="header page__section">
      <div className="header__logo">
        <img
          alt="Logotipo A Caixa de Morfeu"
          className="header__logo-image"
          src={logo}
        />
        <span className="header__logo-text">A Caixa de Morfeu</span>
      </div>

      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link--active" : ""}`
          }
          onClick={handleLinkClick}
        >
          Home
        </NavLink>

        <NavLink
          to="/simbolos"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link--active" : ""}`
          }
          onClick={handleLinkClick}
        >
          Símbolos
        </NavLink>

        {currentUser && (
          <NavLink
            to="/meus-sonhos"
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
            onClick={handleLinkClick}
          >
            Meus Sonhos
          </NavLink>
        )}
      </nav>

      {currentUser ? (
        <div className="header__user">
          <span className="header__user-name">Olá, {currentUser.name}</span>

          <button
            className="header__button"
            type="button"
            onClick={handleLogoutClick}
          >
            Sair
          </button>
        </div>
      ) : (
        <button
          className="header__button"
          type="button"
          onClick={handleLoginClick}
        >
          Entrar
        </button>
      )}

      <button
        className={`header__menu-button ${
          isMenuOpen ? "header__menu-button--open" : ""
        }`}
        type="button"
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
        onClick={handleMenuToggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Header;
