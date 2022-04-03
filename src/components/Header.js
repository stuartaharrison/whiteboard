import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const { currentUser, signout } = useAuth();

    const handleLogout = async () => {
        try {
            await signout();
        }
        catch(error) {
            console.log(error.message);
        }
    }

    console.log('user details', currentUser);

    return (
        <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item">
                    <img src="/images/logo-large-ivory.png" alt="brand" />
                </div>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink className="navbar-item" to="/">
                        Dashboard
                    </NavLink>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link is-arrowless">
                            <figure className="image is-32x32">
                                <img className="is-rounded" src={currentUser.photoURL} alt="profile-icon" />
                            </figure>
                        </a>
                        <div className="navbar-dropdown is-right">
                            <a className="navbar-item">
                            Overview
                            </a>
                            <a className="navbar-item">
                            Elements
                            </a>
                            <a className="navbar-item" onClick={handleLogout}>
                                Sign Out
                            </a>
                            <hr className="navbar-divider" />
                            <div className="navbar-item">
                                Version 0.0.1
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;