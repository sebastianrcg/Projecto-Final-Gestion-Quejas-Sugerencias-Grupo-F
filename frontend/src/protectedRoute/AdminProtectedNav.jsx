import styles from "./protectednav.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo2 from "../../public/logo2.png";

import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { LuFileSearch } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { VscCommentDiscussionSparkle } from "react-icons/vsc";
import { SiGithubactions } from "react-icons/si";


const AdminProtectedNav = ({style}) => {
    const {signOut} = useAuth()
    
    return (
        <>
            <nav className={style}>
                <img src={logo2} alt="Logo Image" className={styles.logo
                }/>
                <NavLink className={styles.link}><IoHomeOutline /> <p>Home</p></NavLink>
                <NavLink className={styles.link}><AiOutlineDashboard /> <p>Dashboard</p></NavLink>
                <NavLink className={styles.link}><VscCommentDiscussionSparkle /> <p>Quejas</p></NavLink>
                <NavLink className={styles.link}><LuFileSearch /> <p>Investigacion</p></NavLink>
                <NavLink className={styles.link}><SiGithubactions /><p>Acciones Correctivas</p> </NavLink>
                <NavLink className={styles.link}><FaRegUser /><p>Usuarios</p></NavLink>
                <NavLink className={styles.link}><HiOutlineDocumentReport /><p>Reportes</p></NavLink>
                <NavLink className={styles.logOutBtn} onClick={signOut}>Cerrar sesion</NavLink>
            </nav> 
        </>
    )
}

export default AdminProtectedNav;