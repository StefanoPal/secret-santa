import { Link } from "react-router-dom";
import React from "react";
function Navbar() {


    return (
        <nav>
            <ul>
                <li><Link to={"login"}>Login</Link></li>
                <li><Link to={"logout"}>Logout</Link></li>
                <li><Link to={"mylist"}>My List</Link></li>
                <li><Link to={"lists"}>Other Lists</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;