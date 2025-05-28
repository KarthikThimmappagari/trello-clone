import React from 'react';
import '../styles/Header.css';

const Header = ({ onReset }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-wrapper">
                    <img className="logoImg" src="src/assets/image.png" alt="logo" />

                    <h1 className="">Trello</h1>
                </div>
                <button className="reset-btn" onClick={onReset}>
                    Reset Board
                </button>
            </div>
        </header>
    );
};

export default Header;
