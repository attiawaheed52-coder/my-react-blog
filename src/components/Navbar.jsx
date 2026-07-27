import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import './Navbar.css';

function Navbar({ setActiveCategory }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={() => setActiveCategory('All')}>
          FASHION<span className="logo-dot">.</span>
        </Link>
        <div className="nav-links">
          <Link to="/" onClick={() => setActiveCategory('All')}>Home</Link>
          <Link to="/" onClick={() => setActiveCategory('Fashion Trends')}>Fashion Trends</Link>
          <Link to="/" onClick={() => setActiveCategory('Styling Tips')}>Styling Tips</Link>
          <Link to="/" onClick={() => setActiveCategory('Summer Fashion')}>Summer Fashion</Link>
          <Link to="/" onClick={() => setActiveCategory('Luxury Fashion')}>Luxury Fashion</Link>
          <button className="nav-form-btn" onClick={() => setIsFormOpen(true)}>Add Post</button>
        </div>
      </nav>
      
      <BlogForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}

export default Navbar;