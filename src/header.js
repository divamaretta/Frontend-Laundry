import React from "react";
import { NavLink } from "react-router-dom";

function header() {
    return (
        <nav>
            <NavLink exact activeClassName="active" to="/">
                Home
            </NavLink>
            <NavLink exact activeClassName="active" to="/User.js">
                users
            </NavLink>
            <NavLink exact activeClassName="active" to="/Member.js">
                Member
            </NavLink>
            <NavLink exact activeClassName="active" to="/Paket.js">
                Paket
            </NavLink>

        </nav>
    )
}

export default header;