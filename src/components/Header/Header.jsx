import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/cmlogo.png";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleLinkClick() {
    setIsMenuOpen(false);
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
      </nav>

      <button className="header__button">Entrar</button>

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
