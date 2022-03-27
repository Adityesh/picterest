import React from "react";
import "./style.scss";

const NavBar: React.FC = ({ children }) => {
    return (
        <div className="nav">
            <div className="nav-content">
                <h1><b>Picterest</b></h1>
            </div>
        </div>
    );
};

export default NavBar;
