import styles from "./protectednav.module.css";
import { NavLink } from "react-router-dom";

const ProtectedNav = ({style}) => {
    return (
        <>
            <nav className={style}>
                <NavLink >Home</NavLink>
                <NavLink >DashBoard</NavLink>
                <NavLink >Quejas</NavLink>
                <NavLink>Investigacion</NavLink>
                <NavLink >Acciones Correctivas</NavLink>
                <NavLink >Usuarios</NavLink>
                <NavLink >Reportes</NavLink>
                <NavLink >Cerrar sesion</NavLink>
            </nav>
        </>
    )
}

export default ProtectedNav;