import styles from "./protectednav.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedNav = ({style}) => {
    const {signOut} = useAuth()
    
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
                <NavLink onClick={signOut}>Cerrar sesion</NavLink>
            </nav> 
        </>
    )
}

export default ProtectedNav;