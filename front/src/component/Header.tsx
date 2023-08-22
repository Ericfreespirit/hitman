import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={scrolled ? 'header scrolled' : 'header'}>
      <div>
        <a className='header-hitman' href='http://localhost:3000'>HITMAN</a>
      </div>
      <div className="nav">
      </div>
    </div>
  );
};

export default Header;