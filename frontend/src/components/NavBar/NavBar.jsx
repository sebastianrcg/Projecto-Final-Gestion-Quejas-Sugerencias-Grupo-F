import { NavLink } from "react-router-dom";

import styles from "./navBar.module.css";

const NavBar = () => {
    return (
        <nav className={styles.navBar}>
            <div>
                <NavLink to={"/"} className={styles.navLink}>Home</NavLink>
                <NavLink to={"/reportarQueja"} className={styles.navLink}>Quejas</NavLink>
                <NavLink to={"/tracking"} className={styles.navLink}>Tracking</NavLink>
            </ div>

            <NavLink to={"/login"} className={styles.loginBtn}>Login</NavLink>
        </nav>
    )
}

export default NavBar;