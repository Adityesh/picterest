import React from "react";
import './style.scss';

const NavBar : React.FC = ({ children })  => {
    return (
        <div className="nav">
            {children}
        </div>
    );
};

export default NavBar;
