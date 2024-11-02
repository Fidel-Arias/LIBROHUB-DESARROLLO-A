import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = ({ usuario, carritoCount }) => (
  <header className="header">
    <div className="top-bar">
      <Link to="/" className="logo">LibroHub</Link>
      <div className="user-links">
        <Link to="/quienes-somos">Quiénes Somos</Link>
        <Link to="/contacto">Contacto</Link>
        {usuario ? (
          <span className="user-name">{usuario}</span>
        ) : (
          <Link to="/login">Mi Cuenta</Link>
        )}
      </div>
    </div>
    <div className="nav-bar">
      <nav className="main-nav">
        <Link to="/">Inicio</Link>
        <Link to="/libros">Libros</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/plan-lector">Plan Lector</Link>
        <Link to="/novedades">Novedades</Link>
      </nav>
      <div className="search-container">
        <input type="text" placeholder="Buscar libros..." className="search-bar" />
        <button className="search-button">Buscar</button>
      </div>
      <Link to="/carrito" className="cart-button">🛒 Mi Compra ({carritoCount})</Link>
    </div>
  </header>
);

export default Header;
