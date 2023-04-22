import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h3>Movies App</h3>
      </Link>
      <Link to="/favourites">
        <h4>Favourites</h4>
      </Link>
    </div>
  );
}

export default Header